'use strict';
const container = document.getElementById('products');
const statusEl = document.getElementById('catalog-status');
const featuredIds = [99,131,71,76,135,116];
const money = new Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'});
let products = [];
function safeUrl(value, image = false) {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password && (image ? /^(http2\.mlstatic\.com|[a-z0-9]+\.supabase\.co)$/.test(u.hostname) : ['meli.la','www.mercadolivre.com.br','produto.mercadolivre.com.br'].includes(u.hostname)) ? u.href : null; } catch { return null; }
}
function element(tag, cls, text) { const el = document.createElement(tag); if(cls) el.className=cls; if(text) el.textContent=text; return el; }
function productLink(url) { const a=element('a'); a.href=url; a.target='_blank'; a.rel='sponsored noopener noreferrer'; return a; }
function category(title) { return /ancinho|mangueira|poda|enxada|pulverizador|roçadeira|jardim|motosserra|pá de/i.test(title) ? 'Campo e jardim' : /óculos|luva|bota|proteção/i.test(title) ? 'Proteção no trabalho' : /gerador|bomba|compressor/i.test(title) ? 'Equipamentos' : 'Ferramentas'; }
function renderProducts() {
  for(const p of products) {
    const card=element('article','product'); const photo=productLink(p.url_curta);photo.className='product-image';photo.tabIndex=-1;photo.setAttribute('aria-hidden','true');
    const img=element('img');img.src=p.imagem;img.alt='';img.loading='lazy';img.width=320;img.height=270;
    img.addEventListener('error',()=>{img.src='assets/logo.png';},{once:true});photo.append(img);
    const body=element('div','product-body');body.append(element('span','product-type',category(p.titulo)));
    const title=element('h3');const link=productLink(p.url_curta);link.textContent=p.titulo;title.append(link);body.append(title);
    const price=element('div','product-price');price.append(element('small',null,'Preço de referência'),document.createTextNode(money.format(Number(p.preco))));body.append(price);
    const buy=productLink(p.url_curta);buy.className='product-buy';buy.textContent='Ver no Mercado Livre';buy.setAttribute('aria-label','Ver '+p.titulo+' no Mercado Livre');buy.append(element('span',null,'↗'));body.append(buy);card.append(photo,body);container.append(card);
  }

}
async function read(url) { const r=await fetch(url,{signal:AbortSignal.timeout(10000)});if(!r.ok) throw new Error('Catálogo indisponível');return r.json(); }
async function start() {
  try {
    let data;
    try { data=await read('/.netlify/functions/products'); } catch { data=await read('products.json'); }
    if(!Array.isArray(data.products)) throw new Error('Catálogo inválido');
    products=featuredIds.map(id=>data.products.find(p=>p.id===id)).filter(Boolean).filter(p=>safeUrl(p.url_curta)&&safeUrl(p.imagem,true)&&typeof p.titulo==='string'&&Number.isFinite(Number(p.preco))&&Number(p.preco)>0);
    statusEl.textContent=products.length ? '' : 'Nenhuma ferramenta disponível nesta seleção. Acompanhe as novidades no grupo.';
    statusEl.hidden=products.length>0;
    renderProducts();
  } catch { statusEl.textContent='Não foi possível carregar as ferramentas. Você pode acompanhar a seleção pelo grupo de WhatsApp.'; }
}
document.getElementById('year').textContent=new Date().getFullYear();start();

// Efeito visual solicitado: nomes fictícios; não representa eventos do WhatsApp.
const groupToast = document.getElementById('group-toast');
const simulatedJoins = [
  ['Marcos S.','Cuiabá, MT'], ['Juliana R.','Rondonópolis, MT'],
  ['Carlos E.','Goiânia, GO'], ['Pedro H.','Campo Grande, MS'],
  ['André L.','Sinop, MT'], ['Felipe M.','Várzea Grande, MT'],
  ['Rafael T.','Cuiabá, MT'], ['Bruno C.','Primavera do Leste, MT'],
  ['Diego A.','Rondonópolis, MT'], ['Thiago N.','Goiânia, GO'],
  ['Gustavo P.','Sorriso, MT'], ['Leandro F.','Cuiabá, MT']
];
let joinIndex = Math.floor(Math.random() * simulatedJoins.length);
let hideTimer;
function showSimulatedJoin() {
  if (document.hidden) return;
  joinIndex = (joinIndex + 1) % simulatedJoins.length;
  const [name, city] = simulatedJoins[joinIndex];
  document.getElementById('join-name').textContent = name;
  document.getElementById('join-city').textContent = city;
  document.getElementById('join-avatar').textContent = name.charAt(0);
  groupToast.classList.add('show');
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => groupToast.classList.remove('show'), 4200);
}
setTimeout(showSimulatedJoin, 2200);
setInterval(showSimulatedJoin, 9000);
