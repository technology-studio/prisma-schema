# Prisma schema

Prisma schema processor

## Cli commands

```bash
yarn prisma-schema --help
```

### **process**

based on [@smcelhinney](https://github.com/smcelhinney)'s [smcelhinney/prisma-merge-schema](https://github.com/smcelhinney/prisma-merge-schema)

#### Decorators

* @attribute-override
* @attribute-remove
* @auto-delete
* @extend
* @inherits
* @import
* @abstract

## Api reference
* � TBD �

## Example

Following files

#### **`Header`**
```prisma:example/prisma/src/header.template.prisma
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
  // previewFeatures = []
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

```

#### **`Abstract entities`**
```prisma:example/prisma/src/base.template.prisma
model BaseModel { // @abstract
  id                String      @id @default(cuid())
  createdDateTime   DateTime    @default(now())
  updatedDateTime   DateTime    @updatedAt
  deletedDateTime   DateTime    @default("1970-01-01T00:00:00-00:00")
}

```

#### **`Entity inheritance`**
```prisma:example/prisma/src/inherit.template.prisma
// @import './base.template.prisma'

enum Platform {
  ANDROID
  IOS
  WEB
  WINDOWS
}

model Application { // @inherits BaseModel
  clientKey         String
  clientSecret      String
  platform          Platform
}


```

#### **`Entity extending`**
```prisma:example/prisma/src/extend.template.prisma

model Application { // @extend
  version           String
}

model Application { // @extend
  name           String
}

```

#### **`Entity attribute override`**
```prisma:example/prisma/src/attribute-override.template.prisma
model Application { // @attribute-override
  clientSecret         Int
}

```

#### **`Entity attribute removal`**
```prisma:example/prisma/src/attribute-remove.template.prisma
model Application { // @attribute-remove
  clientKey         Int
}

```

#### **`Main source template`**
```prisma:example/prisma/src/schema.template.prisma
// @import './header.template.prisma'
// @import './inherit.template.prisma'
// @import './extend.template.prisma'
// @import './attribute-override.template.prisma'
// @import './attribute-remove.template.prisma'

```

will produce

#### **`Autogenerated prisma schema`**
```prisma:example/prisma/schema.prisma
// This file was generated by @txo/prisma-schema (https://www.npmjs.com/package/@txo/prisma-schema)
generator client {
  provider      = "prisma-client-js"
  binaryTargets = ["native", "rhel-openssl-1.0.x"]
  // previewFeatures = []
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Platform {
  ANDROID
  IOS
  WEB
  WINDOWS
}

model Application {
  id              String   @id @default(cuid())
  createdDateTime DateTime @default(now())
  updatedDateTime DateTime @updatedAt
  deletedDateTime DateTime @default("1970-01-01T00:00:00-00:00")
  clientSecret    Int
  platform        Platform
  version         String
  name            String
}

```
