# LOAD-IMAGE

Promise-based image preloading function.

## Usage

```typescript
import {loadImage} from "@alxcube/load-image";

loadImage('image/url.png')
    .then(img => document.body.appendChild(img));
```