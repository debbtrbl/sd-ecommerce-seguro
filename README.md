# sd-ecommerce-seguro

monitoramento Passo a passo

1 - abre o Docker Desktop

2 - rodar backend
cd backend
npm run dev

3 - abrir monitoramento (OUTRO TERMINAL)
cd monitoring
docker compose up

4 - abrir navegador
rota de métricas: http://localhost:3000/metrics

5 - abrir grafana
http://localhost:3001
user e senha: admin

6 - abrir dashboard

7 - faz requisições no postman e observa os gráficos 