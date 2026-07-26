export type Lang = "tr" | "de" | "en";

export const translations = {
  tr: {
    nav: {
      about: "Manifesto",
      focus: "Ne İnşa Ederim",
      framework: "ORDU",
      cases: "Sistemler",
      experience: "Deneyim",
      ideas: "Fikirler",
      contact: "İletişim",
    },
    hero: {
      eyebrow: "EVREN ORDU · FRANKFURT",
      brand: "THE SYSTEM ARCHITECT",
      headline:
        "Şirketler için işletim sistemleri kurarım — ve etkisini gerçek operasyonlarda kanıtlarım.",
      role: "Girişimci · Sistem Mimarı · AI & Dijital Dönüşüm",
      support:
        "AI’ı geliştirme ortağı olarak kullanarak 15’ten fazla şirketten oluşan bir grubun operasyonel omurgasını kurdum — tekliften e-faturaya, şantiyeden finansal kontrole kadar. Dönüşüm hakkında yalnızca konuşmam. Uygularım.",
      ctaPrimary: "Çalışmalarımı Keşfedin",
      ctaSecondary: "Bir Görüşme Başlatın",
      scroll: "Kaydırın",
    },
    about: {
      kicker: "Manifesto",
      title:
        "Mevcut sistemler operasyonun gerçeğini yansıtmayınca yenisini kurdum.",
      blocks: [
        {
          h: "Kaosu kabullenmeyen mühendis",
          t: "Mühendislik eğitimi aldım, yaklaşık yirmi yıllık yönetim deneyimiyle şekillendim. İnşaat, gayrimenkul ve operasyonda aynı sorunla tekrar tekrar karşılaştım: En pahalı maliyet kalemi bilançoda görünmez — insanlar, süreçler ve sistemler arasındaki kaostur.",
        },
        {
          h: "Bu yüzden yeni bir sistem kurdum",
          t: "Standart çözümler operasyonun gerçekliğini karşılamayınca kendim inşa etmeye başladım. AI’ı geliştirme ortağı olarak kullanarak şantiye, gayrimenkul, personel, satış ve finansal kontrolü birleştiren entegre bir ERP ortaya çıktı — tek veri temeli, tek sistem.",
        },
        {
          h: "Bu daha başlangıç",
          t: "Küçük ve odaklı bir ekip bugün AI ile geçmişte tüm departmanların ihtiyaç duyduğu sistemleri kurabiliyorsa, değişen yalnızca yazılım geliştirme değildir. Şirketlerin nasıl kurulduğu ve yönetildiği de değişir. Ben tam olarak bunun üzerinde çalışıyorum.",
        },
      ],
      principle: "İnsan · Süreç · Veri · AI — tek sistemde.",
    },
    focus: {
      kicker: "Ne İnşa Ederim",
      title: "Altı disiplin. Tek bir işletim sistemi.",
      cards: [
        { t: "Liderlik & Operasyon", d: "Çok lokasyonlu ekipleri hizalar, kararı yönetim tablosuna taşırım — sonuç: kontrollü ve ölçeklenebilir operasyon." },
        { t: "AI & Dijital Dönüşüm", d: "Yapay zekâyı süreçlerin içine gömerim — sonuç: daha hızlı karar, daha az manuel iş, ölçülebilir verim." },
        { t: "ERP & Sistem Mimarisi", d: "Finans, operasyon ve sahayı tek omurgada birleştiririm — sonuç: gerçek zamanlı görünürlük ve tek doğru veri." },
        { t: "Büyüme & Marka Sistemleri", d: "Ürünü, hikâyeyi ve satışı ölçeklenebilir bir motora dönüştürürüm — sonuç: tekrar edilebilir büyüme." },
        { t: "Gayrimenkul & İnşaat Operasyonu", d: "Şantiye, sözleşme ve rakamları aynı dilde konuşturan yapılar kurarım — sonuç: bütçede, zamanında teslim." },
        { t: "Uluslararası İş Geliştirme", d: "Almanya–Türkiye–Avrupa hattında köprü kurarım — sonuç: yeni pazar, yeni ortaklık, yeni gelir kanalı." },
      ],
    },
    exp: {
      kicker: "Deneyim",
      title: "20 yıl. Birden fazla ülke. Tek bir disiplin.",
      items: [
        { y: "Formasyon", t: "Elektrik & Elektronik Mühendisi", d: "Sistem düşüncesinin ve mühendislik disiplininin temeli." },
        { y: "Yönetim", t: "Üst Düzey Yönetim & Genel Müdürlük", d: "Çok lokasyonlu operasyon, P&L sorumluluğu ve operasyonel kontrol." },
        { y: "Coğrafya", t: "Almanya · Türkiye · Avrupa", d: "Frankfurt merkezli; sınır ötesi liderlik ve iş geliştirme." },
        { y: "Teknoloji", t: "ERP & AI Girişimleri", d: "Gerçek iş süreçleri etrafında tasarlanmış teknoloji." },
      ],
    },
    framework: {
      kicker: "İmza Yaklaşımı",
      title: "ORDU Framework",
      sub: "Kaosu sisteme, sistemi ölçeğe dönüştüren dört adımlı disiplin.",
      pillars: [
        { k: "O", t: "Observe", d: "Gerçeği gör." },
        { k: "R", t: "Reframe", d: "Doğru problemi tanımla." },
        { k: "D", t: "Design", d: "İnsan, süreç ve teknolojiyi tasarla." },
        { k: "U", t: "Unify", d: "Her şeyi tek çalışan sistemde birleştir." },
      ],
      outcomeLabel: "THE OUTCOME",
      outcomeWord: "SCALE",
      outcomeDesc: "Ölçülebilir. Sürdürülebilir. Tekrarlanabilir.",
    },
    cases: {
      kicker: "Sistemler & Seçili Çalışmalar",
      title: "Fikirden sisteme, sistemden ölçeğe.",
      problemLabel: "Problem",
      systemLabel: "Sistem",
      impactLabel: "Etki",
      items: [
        {
          tag: "BauERP · Özel Geliştirme",
          status: "Aktif Uygulama",
          t: "Bir şirket grubunun dijital omurgası.",
          problem:
            "Şantiye, satın alma, sözleşmeler, bütçeler, muhasebe ve gayrimenkul yönetimi; bir düzineden fazla şirkette, üç dilde ve ortak veri temeli olmadan ayrı silolar hâlinde çalışıyordu.",
          system:
            "Yedi ana modül grubu ve 17 otomatik görevden oluşan entegre bir iş işletim sistemi — tekliften e-faturaya, banka mutabakatından kiracı portalına, AI destekli şantiye raporlarından denetime hazır dokümantasyona kadar.",
          impact:
            "15’ten fazla GmbH/KG için tek veri temeli. Beş dakikada bir muhasebe senkronizasyonu. 42 GB şantiye medyasının otomatik olarak yapılandırılması ve arşivlenmesi. İzlenebilir denetim kayıtlarıyla rol, şirket ve portal izolasyonu.",
        },
        {
          tag: "AIOS",
          status: "Framework & Ürün Geliştirme",
          t: "Şirket bilgisini işletim sistemine dönüştürmek.",
          problem: "Bilgi insanlarda ve dağınık dosyalarda kalıyor.",
          system: "Şirket hafızası, AI, SOP, karar desteği ve iş akışları tek yapı içinde.",
          impact: "Daha hızlı onboarding, daha tutarlı kararlar ve kurumsal hafıza.",
        },
        {
          tag: "Multi-Site Transformation",
          status: "Yönetici Deneyimi",
          t: "Bireysel lokasyonlardan tek işletim modeline.",
          problem: "Her lokasyon farklı çalışıyor.",
          system: "KPI, iş gücü planlama, raporlama ve standart operasyon modeli.",
          impact: "Kontrol, karşılaştırılabilirlik ve ölçeklenebilir büyüme.",
        },
      ],
      proof: {
        label: "BauERP · Doğrulanmış Ölçek",
        items: [
          { n: "7", t: "Ana Modül Grubu" },
          { n: "17", t: "Otomatik Görev" },
          { n: "15+", t: "GmbH/KG" },
          { n: "3", t: "Arayüz Dili" },
        ],
      },
      supportingLabel: "Destekleyen Projeler",
      supporting: [
        { t: "Digital Transformation", d: "Süreçlerin AI ile yeniden tasarlanması ve ölçülebilir verim." },
        { t: "International Real Estate Marketing", d: "Sınır ötesi gayrimenkul pazarlaması ve satış operasyonu." },
      ],
      note: "Detaylı bilgi talep üzerine paylaşılır.",
    },
    ideas: {
      kicker: "Üzerinde Çalıştığım Fikirler",
      title: "Fikirler. Sistemler. Gelecek.",
      intro:
        "Gündemi değil, sistemi konuşan notlar. Pratik, sahadan çıkmış, uygulanabilir düşünce.",
      items: [
        {
          tag: "AI",
          t: "Yapay Zekâ Bir Araç Değil. Bir Yönetim Katmanı.",
          d: "AI'yi bir eklenti gibi değil, kararların üstünde çalışan bir katman olarak düşündüğünüzde şirketiniz farklı çalışmaya başlar.",
        },
        {
          tag: "Leadership",
          t: "Şirketler Ölçeklenmez. Sistemler Ölçeklenir.",
          d: "Büyüme, kahramanlıkla değil; tekrarlanabilir sistemlerle gelir. Liderin işi motor kurmaktır.",
        },
        {
          tag: "Operations",
          t: "Operasyonel Kaosun Görünmeyen Maliyeti.",
          d: "Bilançoda yer almayan ama her ay ödediğiniz gerçek fatura: dağınıklık, kopukluk ve tekrarlanan hata.",
        },
      ],
    },
    personal: {
      kicker: "İnsan Boyutu",
      title: "Sistemler mantık ister. Liderlik insanlık.",
      body:
        "Mühendislik bana sistem düşünmeyi öğretti. Yönetim, insanların sistemlerden daha karmaşık olduğunu gösterdi. Babalık ise sorumluluk, sabır ve geleceğe yatırımın anlamını öğretti.",
      interests: [
        { t: "Fotoğraf", d: "Başkalarının gözden kaçırdığını görmek." },
        { t: "Formula 1", d: "Hassasiyet, hız ve takım çalışması." },
        { t: "Felsefe", d: "Daha iyi sorular sormak." },
        { t: "Babalık", d: "Geleceğe inşa etmek." },
      ],
    },
    contact: {
      kicker: "Konuşalım",
      title: "Farklı inşa etmeye hazır liderlerle çalışırım.",
      body:
        "Operasyonunuzu ölçeklemek, AI ve ERP ile yeniden tasarlamak veya yeni bir iş sistemini hayata geçirmek istiyorsanız konuşalım.",
      cta: "Birlikte İnşa Edelim",
      requestsLabel: "Nasıl yardımcı olabilirim",
      requests: [
        { t: "Yönetici Pozisyonları", d: "Executive & advisory roller." },
        { t: "Dönüşüm Projeleri", d: "AI, ERP ve operasyonel yeniden yapılanma." },
        { t: "Stratejik Ortaklıklar", d: "Almanya–Türkiye–Avrupa hattında iş birlikleri." },
        { t: "Konuşma & Medya", d: "Panel, konferans ve yayın." },
      ],
      linkedin: "LinkedIn",
      email: "E-posta",
      whatsapp: "WhatsApp",
    },
    footer: {
      loc: "Frankfurt / Germany",
      tag: "Berraklık, cesaret ve sistemler üzerine inşa edildi.",
      rights: "Tüm hakları saklıdır.",
    },
  },
  de: {
    nav: {
      about: "Manifest",
      focus: "Was ich baue",
      framework: "ORDU",
      cases: "Systeme",
      experience: "Erfahrung",
      ideas: "Ideen",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "EVREN ORDU · FRANKFURT",
      brand: "THE SYSTEM ARCHITECT",
      headline:
        "Ich baue Betriebssysteme für Unternehmen – und beweise ihre Wirkung in der Praxis.",
      role: "Unternehmer · Systemarchitekt · KI & Digitale Transformation",
      support:
        "Mit KI als Entwicklungspartner habe ich das operative Rückgrat einer Unternehmensgruppe mit mehr als 15 Gesellschaften aufgebaut – vom Angebot bis zur E-Rechnung, von der Baustelle bis zur Finanzsteuerung. Ich rede nicht nur über Transformation. Ich setze sie um.",
      ctaPrimary: "Projekte entdecken",
      ctaSecondary: "Gespräch starten",
      scroll: "Scrollen",
    },
    about: {
      kicker: "Manifest",
      title:
        "Als bestehende Systeme unsere Realität nicht abbilden konnten, habe ich ein neues aufgebaut.",
      blocks: [
        {
          h: "Der Ingenieur, der Chaos nicht akzeptierte",
          t: "Ausgebildet als Ingenieur, geprägt durch fast zwei Jahrzehnte im Management. In Bau, Immobilien und Operations begegnete mir immer wieder dasselbe Problem: Der teuerste Kostenblock erscheint in keiner Bilanz – das Chaos zwischen Menschen, Prozessen und Systemen.",
        },
        {
          h: "Also baute ich ein neues System",
          t: "Als Standardlösungen unsere operative Realität nicht abbilden konnten, begann ich selbst zu bauen. Mit KI als Entwicklungspartner entstand ein integriertes ERP für Baustelle, Immobilien, Personal, Vertrieb und Finanzsteuerung – eine Datenbasis, ein System.",
        },
        {
          h: "Das ist erst der Anfang",
          t: "Wenn heute ein kleines, fokussiertes Team mit KI Systeme entwickeln kann, für die früher ganze Abteilungen notwendig waren, verändert sich nicht nur Softwareentwicklung. Es verändert sich, wie Unternehmen aufgebaut und geführt werden. Genau daran arbeite ich.",
        },
      ],
      principle: "Mensch · Prozess · Daten · KI – in einem System.",
    },
    focus: {
      kicker: "Was ich baue",
      title: "Sechs Disziplinen. Ein Betriebssystem.",
      cards: [
        { t: "Leadership & Operations", d: "Standortübergreifende Teams ausrichten, Entscheidungen ins Cockpit bringen — für kontrollierte, skalierbare Operations." },
        { t: "KI & Digitale Transformation", d: "KI in Prozesse einbetten — für schnellere Entscheidungen, weniger manuelle Arbeit und messbare Produktivität." },
        { t: "ERP & Systemarchitektur", d: "Finance, Operations und Baustelle auf eine Achse — für Echtzeit-Sichtbarkeit und eine einzige Wahrheit." },
        { t: "Wachstums- & Markensysteme", d: "Produkt, Story und Vertrieb als skalierbarer Motor — für wiederholbares Wachstum." },
        { t: "Real Estate & Bau-Operations", d: "Baustelle, Vertrag und Zahlen sprechen dieselbe Sprache — für Termin- und Budgettreue." },
        { t: "International Business Development", d: "Brücke zwischen Deutschland, Türkei und Europa — für neue Märkte, Partner und Umsatzquellen." },
      ],
    },
    exp: {
      kicker: "Erfahrung",
      title: "20 Jahre. Mehrere Länder. Eine Disziplin.",
      items: [
        { y: "Fundament", t: "Elektro- & Elektronikingenieur", d: "Systemdenken und Ingenieursdisziplin als Basis." },
        { y: "Führung", t: "Senior Management & Geschäftsführung", d: "Standortübergreifende Operations, P&L-Verantwortung und operative Kontrolle." },
        { y: "Geografie", t: "Deutschland · Türkei · Europa", d: "Basis Frankfurt; grenzüberschreitende Führung und Business Development." },
        { y: "Technologie", t: "ERP & KI-Initiativen", d: "Technologie, entworfen um echte Geschäftsprozesse." },
      ],
    },
    framework: {
      kicker: "Signature Approach",
      title: "ORDU Framework",
      sub: "Vier Schritte, die Chaos in System und System in Skalierung verwandeln.",
      pillars: [
        { k: "O", t: "Observe", d: "Sieh die Realität." },
        { k: "R", t: "Reframe", d: "Definiere das richtige Problem." },
        { k: "D", t: "Design", d: "Gestalte Mensch, Prozess und Technologie." },
        { k: "U", t: "Unify", d: "Vereine alles in einem funktionierenden System." },
      ],
      outcomeLabel: "THE OUTCOME",
      outcomeWord: "SCALE",
      outcomeDesc: "Messbar. Nachhaltig. Wiederholbar.",
    },
    cases: {
      kicker: "Systeme & ausgewählte Arbeiten",
      title: "Von der Idee zum System, vom System zur Skalierung.",
      problemLabel: "Problem",
      systemLabel: "System",
      impactLabel: "Wirkung",
      items: [
        {
          tag: "BauERP · Eigenentwicklung",
          status: "Aktive Implementierung",
          t: "Das digitale Rückgrat einer Unternehmensgruppe.",
          problem:
            "Baustelle, Einkauf, Verträge, Budgets, Buchhaltung und Immobilienverwaltung arbeiteten in getrennten Silos – über mehr als ein Dutzend Gesellschaften, in drei Sprachen und ohne gemeinsame Datenbasis.",
          system:
            "Ein integriertes Business Operating System mit sieben Hauptmodulgruppen und 17 automatisierten Aufgaben – vom Angebot bis zur E-Rechnung, vom Bankabgleich bis zum Mieterportal und von KI-gestützten Baustellenberichten bis zur revisionsfähigen Dokumentation.",
          impact:
            "Eine gemeinsame Datenbasis für mehr als 15 GmbH/KG. Buchhaltungssynchronisation alle fünf Minuten. 42 GB Baustellenmedien automatisch strukturiert und archiviert. Rollen-, Firmen- und Portal-Isolation mit nachvollziehbaren Audit-Trails.",
        },
        {
          tag: "AIOS",
          status: "Framework & Produktentwicklung",
          t: "Unternehmenswissen wird zum Betriebssystem.",
          problem: "Wissen bleibt in Köpfen und verstreuten Dateien.",
          system: "Unternehmensgedächtnis, KI, SOPs, Entscheidungsunterstützung und Workflows in einer Struktur.",
          impact: "Schnelleres Onboarding, konsistentere Entscheidungen, echtes Unternehmensgedächtnis.",
        },
        {
          tag: "Multi-Site Transformation",
          status: "Executive Experience",
          t: "Von einzelnen Standorten zu einem Betriebsmodell.",
          problem: "Jeder Standort arbeitet anders.",
          system: "KPIs, Personalplanung, Reporting und Standard-Betriebsmodell.",
          impact: "Kontrolle, Vergleichbarkeit und skalierbares Wachstum.",
        },
      ],
      proof: {
        label: "BauERP · Verifizierte Skalierung",
        items: [
          { n: "7", t: "Hauptmodulgruppen" },
          { n: "17", t: "Automatisierte Aufgaben" },
          { n: "15+", t: "GmbH/KG" },
          { n: "3", t: "Oberflächensprachen" },
        ],
      },
      supportingLabel: "Unterstützende Projekte",
      supporting: [
        { t: "Digital Transformation", d: "Prozesse mit KI neu gedacht — für messbare Produktivität." },
        { t: "International Real Estate Marketing", d: "Grenzüberschreitendes Immobilien-Marketing und Vertrieb." },
      ],
      note: "Details auf Anfrage.",
    },
    ideas: {
      kicker: "Gedanken in Entwicklung",
      title: "Ideen. Systeme. Zukunft.",
      intro: "Notizen, die nicht Trends, sondern Systeme behandeln. Praktisch, aus der Praxis, umsetzbar.",
      items: [
        {
          tag: "AI",
          t: "KI ist kein Werkzeug. Sie ist eine Führungsebene.",
          d: "Wer KI nicht als Add-on, sondern als Schicht über den Entscheidungen versteht, führt sein Unternehmen anders.",
        },
        {
          tag: "Leadership",
          t: "Unternehmen skalieren nicht. Systeme schon.",
          d: "Wachstum kommt nicht durch Heldentaten, sondern durch wiederholbare Systeme. Führung heißt Motor bauen.",
        },
        {
          tag: "Operations",
          t: "Die versteckten Kosten operativen Chaos.",
          d: "Nicht in der Bilanz — aber jeden Monat bezahlt: Fragmentierung, Reibung, wiederholte Fehler.",
        },
      ],
    },
    personal: {
      kicker: "Menschliche Dimension",
      title: "Systeme brauchen Logik. Führung braucht Menschlichkeit.",
      body:
        "Ingenieurwesen hat mich gelehrt, in Systemen zu denken. Führung hat gezeigt, dass Menschen komplexer sind als Systeme. Vaterschaft hat mich Verantwortung, Geduld und Investition in die Zukunft gelehrt.",
      interests: [
        { t: "Fotografie", d: "Sehen, was andere übersehen." },
        { t: "Formel 1", d: "Präzision, Tempo und Teamarbeit." },
        { t: "Philosophie", d: "Bessere Fragen stellen." },
        { t: "Vaterschaft", d: "Für die Zukunft bauen." },
      ],
    },
    contact: {
      kicker: "Sprechen wir",
      title: "Ich arbeite mit Führungskräften, die anders aufbauen wollen.",
      body:
        "Wenn Sie Ihre Operations skalieren, mit KI und ERP neu gestalten oder ein neues Geschäftssystem umsetzen wollen — sprechen wir.",
      cta: "Gemeinsam aufbauen",
      requestsLabel: "Wobei ich helfen kann",
      requests: [
        { t: "Executive Opportunities", d: "Executive- und Advisory-Rollen." },
        { t: "Transformation Projects", d: "KI, ERP und operative Neugestaltung." },
        { t: "Strategic Partnerships", d: "Kooperationen Deutschland–Türkei–Europa." },
        { t: "Speaking & Media", d: "Panels, Konferenzen und Publikationen." },
      ],
      linkedin: "LinkedIn",
      email: "E-Mail",
      whatsapp: "WhatsApp",
    },
    footer: {
      loc: "Frankfurt / Deutschland",
      tag: "Gebaut auf Klarheit, Mut und Systemen.",
      rights: "Alle Rechte vorbehalten.",
    },
  },
  en: {
    nav: {
      about: "Manifesto",
      focus: "What I Build",
      framework: "ORDU",
      cases: "Systems",
      experience: "Experience",
      ideas: "Ideas",
      contact: "Contact",
    },
    hero: {
      eyebrow: "EVREN ORDU · FRANKFURT",
      brand: "THE SYSTEM ARCHITECT",
      headline:
        "I build operating systems for companies — and prove their impact in practice.",
      role: "Entrepreneur · System Architect · AI & Digital Transformation",
      support:
        "With AI as a development partner, I built the operating backbone for a group of more than 15 companies — from quote to e-invoice, from the construction site to financial control. I do not just talk about transformation. I implement it.",
      ctaPrimary: "Explore My Work",
      ctaSecondary: "Start a Conversation",
      scroll: "Scroll",
    },
    about: {
      kicker: "Manifesto",
      title: "When existing systems could not reflect our reality, I built a new one.",
      blocks: [
        {
          h: "The engineer who refused to accept chaos",
          t: "Trained as an engineer and shaped by nearly two decades in management, I kept seeing the same problem across construction, real estate and operations: the most expensive cost center never appears on the balance sheet — the chaos between people, processes and systems.",
        },
        {
          h: "So I built a new system",
          t: "When standard solutions could not reflect operational reality, I started building. With AI as a development partner, an integrated ERP emerged for construction sites, real estate, people, sales and financial control — one data foundation, one system.",
        },
        {
          h: "This is only the beginning",
          t: "When a small, focused team can now build with AI what once required entire departments, it changes more than software development. It changes how companies are built and led. That is the work I am pursuing.",
        },
      ],
      principle: "People · Process · Data · AI — in one system.",
    },
    focus: {
      kicker: "What I Build",
      title: "Six disciplines. One operating system.",
      cards: [
        { t: "Leadership & Operations", d: "Align multi-site teams and move decisions into the cockpit — for controlled, scalable operations." },
        { t: "AI & Digital Transformation", d: "Embed AI into processes — for faster decisions, less manual work and measurable productivity." },
        { t: "ERP & System Architecture", d: "Unify finance, operations and field on one backbone — for real-time visibility and one source of truth." },
        { t: "Growth & Brand Systems", d: "Turn product, story and sales into a scalable engine — for repeatable growth." },
        { t: "Real Estate & Construction Ops", d: "Make site, contract and numbers speak the same language — for on-time, on-budget delivery." },
        { t: "International Business Development", d: "Bridge Germany, Turkey and Europe — for new markets, partners and revenue streams." },
      ],
    },
    exp: {
      kicker: "Experience",
      title: "20 years. Multiple countries. One discipline.",
      items: [
        { y: "Foundation", t: "Electrical & Electronics Engineer", d: "The base of systems thinking and engineering rigor." },
        { y: "Leadership", t: "Senior Management & General Management", d: "Multi-site operations, P&L ownership and operational control." },
        { y: "Geography", t: "Germany · Turkey · Europe", d: "Based in Frankfurt; cross-border leadership and business development." },
        { y: "Technology", t: "ERP & AI Initiatives", d: "Technology designed around real business processes." },
      ],
    },
    framework: {
      kicker: "Signature Approach",
      title: "ORDU Framework",
      sub: "A four-step discipline turning chaos into system and system into scale.",
      pillars: [
        { k: "O", t: "Observe", d: "See reality." },
        { k: "R", t: "Reframe", d: "Define the right problem." },
        { k: "D", t: "Design", d: "Design people, process and technology." },
        { k: "U", t: "Unify", d: "Unify everything into one working system." },
      ],
      outcomeLabel: "THE OUTCOME",
      outcomeWord: "SCALE",
      outcomeDesc: "Measurable. Sustainable. Repeatable.",
    },
    cases: {
      kicker: "Systems & Selected Work",
      title: "From idea to system, from system to scale.",
      problemLabel: "Problem",
      systemLabel: "System",
      impactLabel: "Impact",
      items: [
        {
          tag: "BauERP · Proprietary Development",
          status: "Active Implementation",
          t: "The digital backbone of a multi-company group.",
          problem:
            "Construction sites, procurement, contracts, budgets, accounting and property management operated in disconnected silos — across more than a dozen companies, in three languages and without a shared data foundation.",
          system:
            "An integrated business operating system with seven core module groups and 17 automated jobs — from quote to e-invoice, bank reconciliation and tenant portals to AI-assisted site reports and audit-ready documentation.",
          impact:
            "One shared data foundation for more than 15 GmbH/KG entities. Accounting synchronization every five minutes. 42 GB of construction media automatically structured and archived. Role, company and portal isolation with traceable audit trails.",
        },
        {
          tag: "AIOS",
          status: "Framework & Product in Development",
          t: "Turning company knowledge into an operating system.",
          problem: "Knowledge lives in people's heads and scattered files.",
          system: "Company memory, AI, SOPs, decision support and workflows inside one structure.",
          impact: "Faster onboarding, more consistent decisions and real institutional memory.",
        },
        {
          tag: "Multi-Site Transformation",
          status: "Executive Experience",
          t: "From individual locations to one operating model.",
          problem: "Every location works differently.",
          system: "KPIs, workforce planning, reporting and a standard operating model.",
          impact: "Control, comparability and scalable growth.",
        },
      ],
      proof: {
        label: "BauERP · Verified Scale",
        items: [
          { n: "7", t: "Core Module Groups" },
          { n: "17", t: "Automated Jobs" },
          { n: "15+", t: "GmbH/KG" },
          { n: "3", t: "Interface Languages" },
        ],
      },
      supportingLabel: "Supporting Projects",
      supporting: [
        { t: "Digital Transformation", d: "Processes redesigned with AI to deliver measurable productivity." },
        { t: "International Real Estate Marketing", d: "Cross-border real estate marketing and sales operations." },
      ],
      note: "Further details available on request.",
    },
    ideas: {
      kicker: "Ideas I’m Exploring",
      title: "Ideas. Systems. Future.",
      intro: "Notes that discuss systems, not trends. Practical thinking, grounded in operations.",
      items: [
        {
          tag: "AI",
          t: "AI Is Not a Tool. It Is a Management Layer.",
          d: "Once you stop treating AI as a plug-in and start treating it as a layer above decisions, your company starts operating differently.",
        },
        {
          tag: "Leadership",
          t: "Companies Don't Scale. Systems Do.",
          d: "Growth doesn't come from heroics — it comes from repeatable systems. A leader's job is to build the engine.",
        },
        {
          tag: "Operations",
          t: "The Hidden Cost of Operational Chaos.",
          d: "It isn't on the balance sheet, but you pay it every month: fragmentation, friction and repeated mistakes.",
        },
      ],
    },
    personal: {
      kicker: "Human Dimension",
      title: "Systems need logic. Leadership needs humanity.",
      body:
        "Engineering taught me to think in systems. Management showed me that people are more complex than systems. Fatherhood taught me responsibility, patience and the meaning of investing in the future.",
      interests: [
        { t: "Photography", d: "Seeing what others overlook." },
        { t: "Formula 1", d: "Precision, speed and teamwork." },
        { t: "Philosophy", d: "Asking better questions." },
        { t: "Fatherhood", d: "Building for the future." },
      ],
    },
    contact: {
      kicker: "Let's talk",
      title: "I work with leaders who are ready to build differently.",
      body:
        "If you want to scale your operations, redesign them with AI and ERP, or bring a new business system to life — let's talk.",
      cta: "Build With Me",
      requestsLabel: "How I can help",
      requests: [
        { t: "Executive Opportunities", d: "Executive and advisory roles." },
        { t: "Transformation Projects", d: "AI, ERP and operational redesign." },
        { t: "Strategic Partnerships", d: "Germany–Turkey–Europe collaborations." },
        { t: "Speaking & Media", d: "Panels, conferences and publications." },
      ],
      linkedin: "LinkedIn",
      email: "Email",
      whatsapp: "WhatsApp",
    },
    footer: {
      loc: "Frankfurt / Germany",
      tag: "Built around clarity, courage and systems.",
      rights: "All rights reserved.",
    },
  },
};

export type Dict = (typeof translations)["tr"];
