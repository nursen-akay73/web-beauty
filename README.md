# Visual Creator Engine

pnpm tabanlı bir **monorepo**: web arayüzleri (`artifacts`), Express API (`artifacts/api-server`) ve ortak paketler (`lib`).

## Gereksinimler

- **Node.js** 22 veya üzeri önerilir (projede modern Vite/React sürümleri kullanılıyor).
- **pnpm** zorunludur; `npm` / `yarn` ile kurulum root `preinstall` script’i tarafından engellenir.

```bash
# pnpm yoksa (örnek: Corepack ile)
corepack enable
corepack prepare pnpm@latest --activate
```

## Repoyu klonlayıp kurma (sırayla)

Proje klasörünün adı klonladığınız dizin adına göre değişir; örnekte `Visual-Creator-Engine` kullanıldı.

```bash
git clone https://github.com/KULLANICI_ADIN/REPO_ADIN.git
cd REPO_ADIN

pnpm install
```

İsteğe bağlı doğrulama:

```bash
pnpm run typecheck
```

## Ortam değişkenleri

### Web uygulamaları (`royal-beauty`, `mockup-sandbox`)

Vite yapılandırması **`PORT`** ve **`BASE_PATH`** olmadan çalışmaz.

| Değişken    | Örnek | Açıklama                                      |
|-------------|-------|-----------------------------------------------|
| `PORT`      | `5173` | Geliştirme sunucusu portu                    |
| `BASE_PATH` | `/`    | Yayın tabanı; kök dizinde çalıştırırken `/` |

Örnek (Linux / macOS, geçici):

```bash
export PORT=5173
export BASE_PATH=/
```

Windows PowerShell:

```powershell
$env:PORT="5173"
$env:BASE_PATH="/"
```

### API sunucusu (`api-server`)

| Değişken | Örnek   | Açıklama                          |
|----------|---------|-----------------------------------|
| `PORT`   | `3000`  | API’nin dinleyeceği port (zorunlu) |

```bash
export PORT=3000
```

İleride veritabanı kullanıldığında **`DATABASE_URL`** (`lib/db`) de gerekli olur; şu anki minimal API yüzeyinde çoğu dosya doğrudan DB import etmiyor olabilir.

## Geliştirme: ana site (`royal-beauty`)

Yeni bir terminalde, önce `PORT` ve `BASE_PATH` verin, sonra:

```bash
pnpm --filter @workspace/royal-beauty run dev
```

Tarayıcıda genelde `http://localhost:<PORT>` (ör. `PORT=5173` ise `http://localhost:5173`).

## Geliştirme: mockup sandbox (`mockup-sandbox`)

```bash
export PORT=5174
export BASE_PATH=/
pnpm --filter @workspace/mockup-sandbox run dev
```

## Geliştirme: API (`api-server`)

```bash
export PORT=3000
pnpm --filter @workspace/api-server run dev
```

Sağlık kontrolü (varsayılan yapıya göre):

```bash
curl http://localhost:3000/api/healthz
```

## Tam derleme (workspace)

```bash
pnpm run build
```

## OpenAPI istemci kodu üretimi (API sözleşmesi değişince)

```bash
pnpm --filter @workspace/api-spec run codegen
```

## GitHub’a gönderme (kısa)

Yerelde repo oluşturduysanız veya ilk push ise:

```bash
git remote add origin https://github.com/KULLANICI_ADIN/REPO_ADIN.git
git branch -M main
git push -u origin main
```
