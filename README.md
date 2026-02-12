# Task Management API

Görev (task) yönetimi için geliştirilmiş basit bir REST API. Express.js ile oluşturulmuş olup in-memory veri saklama yöntemi kullanır.

## Kurulum ve Çalıştırma

### Lokal Ortamda

```bash
cd src
npm install
npm start        # Sunucu http://localhost:3000 adresinde başlar
npm test         # Testleri çalıştırır
```

### Docker ile

```bash
docker build -t task-management-api .
docker run -d -p 3000:3000 --name task-api task-management-api
```

### API Endpoint'leri

| Metot    | Endpoint      | Açıklama              |
|----------|---------------|-----------------------|
| `GET`    | /tasks        | Tüm görevleri listele |
| `GET`    | /tasks/:id    | Tek görev getir       |
| `POST`   | /tasks        | Yeni görev oluştur    |
| `PUT`    | /tasks/:id    | Görevi güncelle       |
| `DELETE` | /tasks/:id    | Görevi sil            |

## İzlenen Yol

1. **Proje yapısının kurulması:** İlk olarak Express.js ile temel proje iskeleti oluşturuldu. Katmanlı mimari (routes → controllers → services → data store) tercih edilerek sorumluluklar net şekilde ayrıldı.

2. **CRUD endpoint'lerinin geliştirilmesi:** `POST`, `GET`, `PUT`, `DELETE` işlemleri `/tasks` rotası altında implemente edildi. Her endpoint için uygun HTTP status kodları (201, 200, 404, 400) döndürüldü.

3. **Validation katmanı:** Middleware tabanlı bir doğrulama katmanı eklenerek gelen isteklerdeki alanlar (`title`, `completed`) tip ve varlık kontrolünden geçirildi. Bilinmeyen alanlar reddedildi.

4. **Test yazımı:** Jest ve Supertest kullanılarak tüm endpoint'ler ve edge case'ler (eksik alan, yanlış tip, olmayan ID) için kapsamlı testler yazıldı.

5. **Docker:** Uygulama, `node:22-alpine` tabanlı bir Docker imajıyla konteynerize edildi.

## Zorlandığım / Karar Aldığım Noktalar

- **Veritabanı kullanmama kararı:** Projenin kapsamı göz önünde bulundurularak veritabanı yerine in-memory bir veri deposu (`task_store.js`) kullanıldı. Bu, projeyi daha basit ve bağımlılıksız tuttu ancak uygulama yeniden başladığında verilerin kaybolması trade-off'u kabul edildi.


- **Tarih formatı:** `createdAt` / `updatedAt` alanlarında UTC yerine lokal zaman dilimi bilgisini içeren ISO formatı tercih edildi; bu kararın kullanılabilirlik açısından daha anlaşılır olacağına karar verildi.

## AI Araçlarının Kullanıldığı Aşamalar

- **Proje iskelesi ve katmanlı mimari kurulumu:** Dosya yapısının oluşturulması, route-controller-service-store ayrımının kurgulanması ve boilerplate kodların yazılması aşamasında GitHub Copilot'tan yararlanıldı.

- **Test senaryoları ve Dockerfile:** Jest testlerinin edge case'leri kapsayacak şekilde genişletilmesi ve Docker konfigürasyonunun hazırlanması sürecinde AI destekli kod üretimi kullanıldı.
