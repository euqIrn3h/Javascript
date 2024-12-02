# Etapa 1: Usando a imagem base do Node.js
FROM node:18-alpine

# Etapa 2: Criando e definindo o diretório de trabalho no container
WORKDIR /app

# Etapa 3: Copiando o arquivo package.json e package-lock.json
COPY package*.json ./

# Etapa 4: Instalando as dependências da aplicação
RUN npm install

# Etapa 5: Copiando o código da aplicação para o container
COPY . .

# Etapa 6: Expondo a porta em que o Express estará rodando (geralmente 3000)
EXPOSE 3000

# Etapa 7: Definindo o comando para iniciar a aplicação
CMD ["npm", "run", "dev"]