TaskFlow — Proje Tanıtım Dokümanı
Projenin Amacı

Bu proje, bir yazılım şirketinin ekip içerisindeki görevleri, projeleri ve çalışanların sorumluluklarını takip edebilmesi amacıyla geliştirilmiş, tamamen REST API mantığında çalışan bir Görev ve Proje Yönetim Sistemi'dir. Katılımcıların eğitim süresince edindikleri Node.js ve Express.js bilgilerini uygulamalı olarak göstermeleri hedeflenmiştir.

Senaryo

Bir yazılım şirketi, ekip içindeki görevleri, projeleri ve çalışanların sorumluluklarını takip etmek istemektedir. Geliştirilen sistem; görevlerin oluşturulmasını, ilgili kişilere atanmasını, durumlarının (beklemede / devam ediyor / tamamlandı) takip edilmesini, önceliklendirilmesini ve güncellenmesini desteklemektedir.

Sistem Özeti

Mimari: Sistem, Node.js ve Express.js kullanılarak geliştirilmiştir. Proje, sorumlulukların net şekilde ayrıldığı katmanlı bir klasör yapısına sahiptir:

routes/ —      hangi isteğin hangi işlevi tetikleyeceğini tanımlar
controllers/ — asıl iş mantığını (görev oluşturma, güncelleme vb.) içerir
data/ —        veri kalıcılığı katmanı ve veri dosyası
middleware/ —  tüm isteklerde ortak çalışan ara katmanlar (loglama gibi)

Veri Modeli: Her görev (Task) şu alanlardan oluşur: benzersiz kimlik (ULID), başlık (title), açıklama (description), durum (status: pending / in-progress / completed), öncelik (priority: sayısal karşılığı olan sabit bir küme), atanan kişi (assignee) ve oluşturulma zamanı (createdAt).

Veri Kalıcılığı: Harici bir veritabanı kullanılmamıştır; veriler, sunucu tarafında bir JSON dosyasında (tasks.json) saklanmaktadır. Sunucu, her istekte bu dosyayı okuyup işlem sonrası güncelleyerek veri kalıcılığını sağlar.

API Tasarımı: Sistem, /tasks kaynağı üzerinden 5 temel CRUD işlemini destekler:

Metod	Endpoint	Açıklama
POST	/tasks	    Yeni görev oluşturma
GET	    /tasks	    Tüm görevleri listeleme
GET	    /tasks/:id	Belirli bir görevin detayını getirme
PATCH	/tasks/:id	Görevi kısmi olarak güncelleme
DELETE	/tasks/:id	Görevi silme

Middleware: Tüm gelen isteklerin (method, endpoint, zaman damgası) konsola kaydedilmesini sağlayan bir Logger middleware'i bulunmaktadır.

Test: Geliştirilen tüm endpoint'ler, Postman aracı kullanılarak hem başarılı senaryolar hem de hata durumları (örneğin var olmayan bir görev isteği için 404 cevabı) açısından test edilmiş ve doğrulanmıştır.