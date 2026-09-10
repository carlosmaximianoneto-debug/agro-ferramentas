// Apenas os campos públicos do catálogo são retornados. Nenhuma chave vai ao navegador.
export default async () => {
  const key=process.env.SUPABASE_PUBLISHABLE_KEY;
  if(!key) return Response.json({error:'Catálogo online não configurado'},{status:503});
  const url=new URL('https://xlwiwxaghbkdwbtwagwo.supabase.co/rest/v1/produtos_agro_ferramentas');
  url.search=new URLSearchParams({select:'id,titulo,preco,imagem,url_curta',link_morto:'eq.false',url_curta:'not.is.null',order:'link_verificado_em.desc.nullslast',id:'in.(99,131,71,76,135,116)',limit:'6'}).toString();
  try {
    const r=await fetch(url,{headers:{apikey:key},signal:AbortSignal.timeout(8000)});
    if(!r.ok) throw new Error('Consulta falhou');
    const products=await r.json();
    if(!Array.isArray(products)) throw new Error('Resposta inválida');
    return Response.json({updatedAt:new Date().toISOString(),products},{headers:{'Cache-Control':'public, max-age=300, s-maxage=300'}});
  } catch { return Response.json({error:'Catálogo temporariamente indisponível'},{status:502}); }
};

