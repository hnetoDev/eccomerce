export const getSubdomain = (): string => {
  const host = window.location.host; // Pega o host completo (ex: teste.helio.shop)
  const subdomain = host.split('.')[0]; // Extrai o subdomínio (ex: "teste")
  return 'teste';
};