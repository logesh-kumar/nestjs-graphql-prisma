FROM node:12 AS builder

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock to Workspace dir
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install
# Generate prisma client, leave out if generating in `postinstall` script
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:12

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/dist ./dist

EXPOSE 4000
CMD [ "npm", "run", "start:prod" ]