from pathlib import Path
from playwright.sync_api import sync_playwright
from PIL import Image, ImageOps, ImageDraw
import subprocess, time, json, os, signal

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'exports'
SHOT = OUT / 'screenshots'
OUT.mkdir(exist_ok=True)
SHOT.mkdir(exist_ok=True)


def build_and_serve():
    subprocess.run(['npm', 'run', 'build'], cwd=ROOT, check=True)
    proc = subprocess.Popen(['python', '-m', 'http.server', '4173', '-d', str(ROOT / 'dist')], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(1)
    return proc


def qa_and_screenshots(page):
    report = []
    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    page.goto('http://127.0.0.1:4173/?slide=1', wait_until='networkidle')
    count = page.locator('.slide').count()
    for idx in range(count):
        page.evaluate("(n)=>document.querySelectorAll('.slide').forEach((el,k)=>el.classList.toggle('active',k===n))", idx)
        q = page.evaluate('''() => {
            const s=document.querySelector('.slide.active'); const inner=s.querySelector('.slide__inner');
            const sr=s.getBoundingClientRect();
            const textEls=[...s.querySelectorAll('h1,h2,h3,h4,p,strong,span,div.label,div.eyebrow')];
            const out=[]; const clip=[];
            for (const el of textEls){
                const r=el.getBoundingClientRect(); if(r.width===0||r.height===0) continue;
                if(r.left < sr.left-1 || r.right > sr.right+1 || r.top < sr.top-1 || r.bottom > sr.bottom+1) out.push((el.textContent||'').slice(0,60));
                if(el.scrollWidth>el.clientWidth+2 || el.scrollHeight>el.clientHeight+2) clip.push((el.textContent||'').slice(0,60));
            }
            const header=s.querySelector('header').getBoundingClientRect();
            const main=s.querySelector('main').getBoundingClientRect();
            const footer=s.querySelector('.footerline').getBoundingClientRect();
            return {innerOverflow:inner.scrollHeight>inner.clientHeight+2 || inner.scrollWidth>inner.clientWidth+2,out,clip,headerMainOverlap:header.bottom>main.top+1,mainFooterOverlap:main.bottom>footer.top+1};
        }''')
        report.append({'slide': idx+1, **q})
        page.screenshot(path=str(SHOT / f'slide-{idx+1:02d}.png'))
    (OUT / 'qa-report.json').write_text(json.dumps({'pageErrors':errors,'slides':report}, ensure_ascii=False, indent=2))
    return report, errors


def contact_sheet(cols=4):
    imgs=[Image.open(p).convert('RGB') for p in sorted(SHOT.glob('slide-*.png'))]
    thumb=(400,225); gap=18; label=28
    rows=(len(imgs)+cols-1)//cols
    sheet=Image.new('RGB',(cols*thumb[0]+(cols+1)*gap,rows*(thumb[1]+label)+(rows+1)*gap),(16,20,23))
    draw=ImageDraw.Draw(sheet)
    for i,img in enumerate(imgs):
        img=ImageOps.fit(img,thumb)
        x=gap+(i%cols)*(thumb[0]+gap); y=gap+(i//cols)*(thumb[1]+label+gap)
        sheet.paste(img,(x,y)); draw.text((x,y+thumb[1]+6),f'{i+1:02d}',fill=(190,200,204))
    sheet.save(OUT/'contact-sheet.png',quality=92)


def export_pdf(page):
    page.goto('http://127.0.0.1:4173/?print=1', wait_until='networkidle')
    page.pdf(path=str(OUT/'qualificacao-mp10.pdf'), width='1600px', height='900px', print_background=True, margin={'top':'0','right':'0','bottom':'0','left':'0'})


if __name__ == '__main__':
    server=build_and_serve()
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch(headless=True)
            page=browser.new_page(viewport={'width':1600,'height':900})
            report, errors=qa_and_screenshots(page)
            contact_sheet()
            export_pdf(page)
            browser.close()
        bad=[r for r in report if r['innerOverflow'] or r['out'] or r['clip'] or r['headerMainOverlap'] or r['mainFooterOverlap']]
        print('page errors:', errors)
        print('slides:', len(report), 'qa issues:', len(bad))
        if bad:
            raise SystemExit(1)
    finally:
        server.terminate()
