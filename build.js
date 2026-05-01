const esbuild = require('esbuild')
const fs = require('fs')
const path = require('path')

async function build(){
  const outdir = path.resolve(__dirname,'dist')
  if(!fs.existsSync(outdir)) fs.mkdirSync(outdir, { recursive: true })

  // bundle JS (includes CSS imports injected)
  await esbuild.build({
    entryPoints: [path.resolve(__dirname,'src','main.jsx')],
    bundle: true,
    outfile: path.join(outdir,'assets','index.js'),
    format: 'esm',
    sourcemap: false,
    minify: false,
    target: ['es2017'],
    loader: { '.js':'jsx', '.jsx':'jsx' },
    legalComments: 'none',
    define: { 'process.env.NODE_ENV': '"production"' }
  })

  // copy and patch index.html
  const htmlSrc = path.resolve(__dirname,'index.html')
  let html = fs.readFileSync(htmlSrc,'utf8')
  // point script to bundled file
  // if CSS was emitted, add a link tag for it so styles load on static hosts
  const cssPath = path.join(outdir,'assets','index.css')
  if (fs.existsSync(cssPath)){
    // insert stylesheet link before the script tag
    html = html.replace(/<script type="module" src=".*"><\/script>/, '<link rel="stylesheet" href="/assets/index.css">\n    <script type="module" src="/assets/index.js"></script>')
  } else {
    html = html.replace(/<script type="module" src=".*"><\/script>/, '<script type="module" src="/assets/index.js"></script>')
  }
  fs.writeFileSync(path.join(outdir,'index.html'), html, 'utf8')

  console.log('Built to', outdir)
}

build().catch(err=>{ console.error(err); process.exit(1) })
