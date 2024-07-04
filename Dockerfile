ARG NODE_VERSION=18.18.2
 
################################################################################
FROM node:${NODE_VERSION}-alpine as base
 
WORKDIR /usr/src/app
################################################################################
FROM base as deps

RUN --mount=type=bind,source=package.json,target=package.json \
   --mount=type=bind,source=yarn.lock,target=yarn.lock \
   --mount=type=cache,target=/root/.yarn \
   yarn install --frozen-lockfile 
################################################################################
FROM deps as build
 
COPY . .
 
RUN yarn add sharp --ignore-engines
RUN yarn build.icons-json
RUN yarn build.types
RUN yarn build.client
RUN yarn lint
################################################################################
FROM base as final
 
ENV NODE_ENV production
ENV ORIGIN http://localhost

USER node

COPY package.json .
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
# COPY --from=build /usr/src/app/server ./server
 
EXPOSE 3000
 
CMD yarn serve