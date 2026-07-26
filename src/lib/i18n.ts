export type Lang = "tr" | "de" | "en";

export const translations = {
  tr: {
    nav: {
      about: "Hakkımda",
      focus: "Odak",
      experience: "Deneyim",
      framework: "Framework",
      work: "Çalışmalar",
      ideas: "Fikirler",
      contact: "İletişim",
    },
    hero: {
      eyebrow: "Evren Ordu — Frankfurt / Germany",
      title: ["Sistemler Kurarım.", "Dönüşümü Yönetirim.", "Geleceği İnşa Ederim."],
      sub: "Yönetici, girişimci ve yapay zekâ odaklı dönüşüm lideri.",
      support:
        "20 yıla yaklaşan operasyon, teknoloji, finansal kontrol ve çok lokasyonlu yönetim deneyimini; yapay zekâ, ERP ve yeni nesil iş modelleriyle birleştiriyorum.",
      ctaPrimary: "Benimle Çalışın",
      ctaSecondary: "Hikâyemi Keşfedin",
      scroll: "Kaydırın",
    },
    about: {
      kicker: "Manifesto",
      title: "Ben sadece şirket yönetmem. Sistem kurarım.",
      body: [
        "Kaosu tanımlarım; yapı kurarım. İnsanı, süreci, finansı ve teknolojiyi tek bir hizada buluştururum.",
        "Parçalanmış organizasyonları ölçülebilir, tekrarlanabilir ve büyütülebilir sistemlere dönüştürürüm.",
        "Kararlarım veriyle beslenir; uygulamam disiplinle yürür; hikâyem insanla anlam kazanır.",
      ],
    },
    focus: {
      kicker: "Odak Alanları",
      title: "Altı disiplin. Tek bir yaklaşım.",
      cards: [
        { t: "Liderlik & Operasyon", d: "Çok lokasyonlu ekipleri hizalar, kararı yönetim tablosuna taşırım." },
        { t: "AI & Dijital Dönüşüm", d: "Yapay zekâyı süreçlerin içine gömer; ölçülebilir verim üretirim." },
        { t: "ERP & Sistem Kurulumu", d: "Finans, operasyon ve sahayı tek bir omurgada birleştiririm." },
        { t: "Büyüme & Marka", d: "Ürünü, hikâyeyi ve satışı ölçekli bir büyüme motoruna dönüştürürüm." },
        { t: "Gayrimenkul & İnşaat", d: "Sahayı, sözleşmeyi ve rakamları aynı dilde konuşturan yapılar kurarım." },
        { t: "Uluslararası İş Geliştirme", d: "Almanya–Türkiye–Avrupa hattında köprü kurar, pazar açarım." },
      ],
    },
    exp: {
      kicker: "Deneyim",
      title: "20 yıl. Birden fazla ülke. Tek bir disiplin.",
      items: [
        { y: "Formasyon", t: "Elektrik & Elektronik Mühendisi", d: "Sistem düşüncesinin ve mühendislik disiplininin temeli." },
        { y: "Yönetim", t: "Üst Düzey Yönetim & Genel Müdürlük", d: "P&L sorumluluğu, çok lokasyonlu operasyon, 40+ çalışan." },
        { y: "Coğrafya", t: "Almanya · Türkiye · Avrupa", d: "Frankfurt merkezli; kültürler ve pazarlar arası köprü." },
        { y: "Teknoloji", t: "ERP & AI Projeleri", d: "Süreç omurgası kuran ve yapay zekâ ile yeniden tasarlayan uygulamalar." },
      ],
    },
    framework: {
      kicker: "İmza Yaklaşımı",
      title: "ORDU Framework",
      sub: "Kaosu sisteme, sistemi ölçeğe dönüştüren beş katmanlı disiplin.",
      pillars: [
        { k: "O", t: "Observe", d: "Sahayı, rakamı ve insanı önyargısız gözlemle." },
        { k: "R", t: "Reframe", d: "Sorunu yeniden çerçevele; gerçek kısıtı isimlendir." },
        { k: "D", t: "Design", d: "Süreci, veriyi ve rolleri birlikte tasarla." },
        { k: "U", t: "Unify", d: "Ekipleri, sistemleri ve hikâyeyi tek bir hizada birleştir." },
        { k: "S", t: "Scale", d: "Tekrarlanabilir, ölçülebilir ve devredilebilir hâle getir." },
      ],
    },
    work: {
      kicker: "Seçilmiş Çalışmalar",
      title: "Fikirden sisteme, sistemden ölçeğe.",
      note: "Detaylı vaka çalışmaları talep üzerine paylaşılır.",
      items: [
        { t: "BauERP", d: "İnşaat sektörüne özel, sahayı ve finansı tek omurgada birleştiren ERP." },
        { t: "AIOS", d: "İşletmenin karar katmanına gömülen yapay zekâ operasyon sistemi." },
        { t: "AI-Enabled Construction", d: "İnşaat operasyonunun yapay zekâ ile yeniden tasarlanması." },
        { t: "Multi-Site Retail Ops", d: "Çok lokasyonlu perakende operasyonunda standardizasyon ve verim." },
        { t: "International Real Estate", d: "Sınır ötesi gayrimenkul pazarlaması ve satış operasyonu." },
        { t: "Corporate Governance", d: "Kurumsal süreç, yetki ve raporlama sistemlerinin kurgulanması." },
      ],
    },
    ideas: {
      kicker: "Düşünce Liderliği",
      title: "Fikirler. Sistemler. Gelecek.",
      items: [
        { tag: "AI", t: "Yapay zekâ neden bir araç değil, bir yönetim katmanıdır." },
        { tag: "Leadership", t: "Liderlik: karar veren değil, karar mimarisi kuran kişi." },
        { tag: "Operations", t: "Operasyon: görünmeyen ama her şeyi ayakta tutan omurga." },
        { tag: "ConstructionTech", t: "İnşaat sektörü neden yazılımın yeni sınırı." },
        { tag: "Transformation", t: "Kişisel dönüşüm olmadan kurumsal dönüşüm olmaz." },
      ],
      soon: "Yakında",
    },
    personal: {
      kicker: "İnsan Boyutu",
      title: "Teknoloji kadar insanı da önemserim.",
      body:
        "Liderlik ve dayanıklılık; babalık ve sabır; fotoğraf, Formula 1, felsefe ve durmayan bir öğrenme merakı. Sayıların arkasında her zaman bir insan, bir hikâye ve bir anlam vardır.",
      chips: ["Liderlik", "Dayanıklılık", "Babalık", "Fotoğraf", "Formula 1", "Felsefe", "Sürekli Öğrenme"],
    },
    contact: {
      kicker: "Konuşalım",
      title: "Bir şirketi büyütmek, bir sistemi kurmak veya bir fikri gerçeğe dönüştürmek istiyorsanız konuşalım.",
      linkedin: "LinkedIn",
      email: "E-posta",
      whatsapp: "WhatsApp",
    },
    footer: {
      loc: "Frankfurt / Germany",
      tag: "Built around clarity, courage and systems.",
      rights: "Tüm hakları saklıdır.",
    },
  },
  de: {
    nav: {
      about: "Über mich",
      focus: "Fokus",
      experience: "Erfahrung",
      framework: "Framework",
      work: "Arbeiten",
      ideas: "Ideen",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "Evren Ordu — Frankfurt / Deutschland",
      title: ["Ich baue Systeme.", "Ich führe Transformation.", "Ich gestalte Zukunft."],
      sub: "Executive, Unternehmer und KI-getriebener Transformationsleader.",
      support:
        "Fast 20 Jahre Erfahrung in Operations, Technologie, Finanzsteuerung und standortübergreifender Führung — kombiniert mit KI, ERP und neuen Geschäftsmodellen.",
      ctaPrimary: "Zusammenarbeiten",
      ctaSecondary: "Meine Geschichte",
      scroll: "Scrollen",
    },
    about: {
      kicker: "Manifest",
      title: "Ich führe nicht nur Unternehmen. Ich baue Systeme.",
      body: [
        "Ich erkenne Chaos und schaffe Struktur. Menschen, Prozesse, Finanzen und Technologie richte ich auf eine Linie aus.",
        "Aus fragmentierten Organisationen werden messbare, wiederholbare und skalierbare Systeme.",
        "Entscheidungen aus Daten, Umsetzung aus Disziplin, Wirkung aus Menschen.",
      ],
    },
    focus: {
      kicker: "Fokusbereiche",
      title: "Sechs Disziplinen. Ein Ansatz.",
      cards: [
        { t: "Leadership & Operations", d: "Standortübergreifende Teams ausrichten, Entscheidungen ins Cockpit bringen." },
        { t: "AI & Digital Transformation", d: "KI in Prozesse einbetten und messbare Produktivität schaffen." },
        { t: "ERP & Systemaufbau", d: "Finance, Operations und Field auf eine gemeinsame Achse bringen." },
        { t: "Growth & Brand", d: "Produkt, Story und Vertrieb zur skalierbaren Wachstumsmaschine formen." },
        { t: "Real Estate & Bau", d: "Baustelle, Vertrag und Zahlen dieselbe Sprache sprechen lassen." },
        { t: "International Business", d: "Deutschland–Türkei–Europa: Brücken bauen, Märkte öffnen." },
      ],
    },
    exp: {
      kicker: "Erfahrung",
      title: "20 Jahre. Mehrere Länder. Eine Disziplin.",
      items: [
        { y: "Fundament", t: "Elektro- & Elektronikingenieur", d: "Systemdenken und Ingenieursdisziplin als Basis." },
        { y: "Führung", t: "Senior Management & Geschäftsführung", d: "P&L-Verantwortung, Multi-Site Operations, 40+ Mitarbeitende." },
        { y: "Geografie", t: "Deutschland · Türkei · Europa", d: "Basis Frankfurt; Brücke zwischen Kulturen und Märkten." },
        { y: "Technologie", t: "ERP & KI-Projekte", d: "Systeme, die das Rückgrat bilden — und mit KI neu gedacht sind." },
      ],
    },
    framework: {
      kicker: "Signature Approach",
      title: "ORDU Framework",
      sub: "Fünf Ebenen, die Chaos in System und System in Skalierung verwandeln.",
      pillars: [
        { k: "O", t: "Observe", d: "Beobachte Feld, Zahlen und Menschen ohne Vorurteil." },
        { k: "R", t: "Reframe", d: "Rahmen das Problem neu; benenne die echte Restriktion." },
        { k: "D", t: "Design", d: "Gestalte Prozess, Daten und Rollen gemeinsam." },
        { k: "U", t: "Unify", d: "Vereine Teams, Systeme und Story auf eine Linie." },
        { k: "S", t: "Scale", d: "Mache es wiederholbar, messbar und übertragbar." },
      ],
    },
    work: {
      kicker: "Ausgewählte Arbeiten",
      title: "Von der Idee zum System, vom System zur Skalierung.",
      note: "Detaillierte Case Studies auf Anfrage.",
      items: [
        { t: "BauERP", d: "Bauspezifisches ERP — Baustelle und Finance auf einer Achse." },
        { t: "AIOS", d: "KI-Betriebssystem, eingebettet in die Entscheidungsebene des Unternehmens." },
        { t: "AI-Enabled Construction", d: "Bauoperations neu gedacht mit künstlicher Intelligenz." },
        { t: "Multi-Site Retail Ops", d: "Standardisierung und Effizienz im Multi-Site Retail." },
        { t: "International Real Estate", d: "Grenzüberschreitendes Immobilien-Marketing und Vertrieb." },
        { t: "Corporate Governance", d: "Prozesse, Verantwortlichkeiten und Reporting neu aufgesetzt." },
      ],
    },
    ideas: {
      kicker: "Thought Leadership",
      title: "Ideen. Systeme. Zukunft.",
      items: [
        { tag: "AI", t: "Warum KI kein Werkzeug ist, sondern eine Führungsebene." },
        { tag: "Leadership", t: "Führung: nicht Entscheider, sondern Architekt der Entscheidungen." },
        { tag: "Operations", t: "Operations: das unsichtbare Rückgrat, das alles trägt." },
        { tag: "ConstructionTech", t: "Warum Bau die neue Frontier für Software ist." },
        { tag: "Transformation", t: "Ohne persönliche Transformation keine Unternehmenstransformation." },
      ],
      soon: "Bald",
    },
    personal: {
      kicker: "Menschliche Dimension",
      title: "Ich sorge mich um Menschen so sehr wie um Technologie.",
      body:
        "Führung und Resilienz; Vaterschaft und Geduld; Fotografie, Formel 1, Philosophie und unaufhörliche Neugier. Hinter jeder Zahl steht ein Mensch, eine Geschichte und ein Sinn.",
      chips: ["Führung", "Resilienz", "Vaterschaft", "Fotografie", "Formel 1", "Philosophie", "Lernen"],
    },
    contact: {
      kicker: "Sprechen wir",
      title: "Wenn Sie ein Unternehmen skalieren, ein System aufbauen oder eine Idee real werden lassen wollen — sprechen wir.",
      linkedin: "LinkedIn",
      email: "E-Mail",
      whatsapp: "WhatsApp",
    },
    footer: {
      loc: "Frankfurt / Deutschland",
      tag: "Built around clarity, courage and systems.",
      rights: "Alle Rechte vorbehalten.",
    },
  },
  en: {
    nav: {
      about: "About",
      focus: "Focus",
      experience: "Experience",
      framework: "Framework",
      work: "Work",
      ideas: "Ideas",
      contact: "Contact",
    },
    hero: {
      eyebrow: "Evren Ordu — Frankfurt / Germany",
      title: ["I build systems.", "I lead transformation.", "I engineer the future."],
      sub: "Executive, entrepreneur and AI-driven transformation leader.",
      support:
        "Nearly 20 years of operations, technology, financial control and multi-site leadership — combined with AI, ERP and next-generation business models.",
      ctaPrimary: "Work with me",
      ctaSecondary: "Discover my story",
      scroll: "Scroll",
    },
    about: {
      kicker: "Manifesto",
      title: "I don't just run companies. I build systems.",
      body: [
        "I identify chaos and build structure. I align people, process, finance and technology on one axis.",
        "I turn fragmented organizations into measurable, repeatable and scalable systems.",
        "Decisions fed by data. Execution carried by discipline. Meaning delivered through people.",
      ],
    },
    focus: {
      kicker: "Focus Areas",
      title: "Six disciplines. One approach.",
      cards: [
        { t: "Leadership & Operations", d: "Align multi-site teams and move decisions into the cockpit." },
        { t: "AI & Digital Transformation", d: "Embed AI into processes to produce measurable productivity." },
        { t: "ERP & System Design", d: "Unify finance, operations and field on a single backbone." },
        { t: "Growth & Brand", d: "Turn product, story and sales into a scalable growth engine." },
        { t: "Real Estate & Construction", d: "Make site, contract and numbers speak the same language." },
        { t: "International Business", d: "Bridge Germany–Turkey–Europe and open new markets." },
      ],
    },
    exp: {
      kicker: "Experience",
      title: "20 years. Multiple countries. One discipline.",
      items: [
        { y: "Foundation", t: "Electrical & Electronics Engineer", d: "The base of systems thinking and engineering rigor." },
        { y: "Leadership", t: "Senior Management & General Management", d: "P&L ownership, multi-site operations, 40+ team members." },
        { y: "Geography", t: "Germany · Turkey · Europe", d: "Based in Frankfurt; a bridge across cultures and markets." },
        { y: "Technology", t: "ERP & AI Projects", d: "Systems that form the backbone — reimagined with AI." },
      ],
    },
    framework: {
      kicker: "Signature Approach",
      title: "ORDU Framework",
      sub: "A five-layer discipline turning chaos into system and system into scale.",
      pillars: [
        { k: "O", t: "Observe", d: "See the field, the numbers and the people without bias." },
        { k: "R", t: "Reframe", d: "Reframe the problem; name the real constraint." },
        { k: "D", t: "Design", d: "Design process, data and roles together." },
        { k: "U", t: "Unify", d: "Align teams, systems and story on one axis." },
        { k: "S", t: "Scale", d: "Make it repeatable, measurable and transferable." },
      ],
    },
    work: {
      kicker: "Selected Work",
      title: "From idea to system, from system to scale.",
      note: "Detailed case studies available on request.",
      items: [
        { t: "BauERP", d: "Construction-specific ERP uniting the site and finance on one backbone." },
        { t: "AIOS", d: "AI operating system embedded into the decision layer of the business." },
        { t: "AI-Enabled Construction", d: "Construction operations re-designed with artificial intelligence." },
        { t: "Multi-Site Retail Ops", d: "Standardization and efficiency across multi-site retail." },
        { t: "International Real Estate", d: "Cross-border real estate marketing and sales operations." },
        { t: "Corporate Governance", d: "Corporate process, authority and reporting systems, redesigned." },
      ],
    },
    ideas: {
      kicker: "Thought Leadership",
      title: "Ideas. Systems. Future.",
      items: [
        { tag: "AI", t: "Why AI is not a tool — it is a management layer." },
        { tag: "Leadership", t: "Leadership: not the decider, but the architect of decisions." },
        { tag: "Operations", t: "Operations: the invisible backbone that carries everything." },
        { tag: "ConstructionTech", t: "Why construction is software's new frontier." },
        { tag: "Transformation", t: "No corporate transformation without personal transformation." },
      ],
      soon: "Soon",
    },
    personal: {
      kicker: "Human Dimension",
      title: "I care about people as much as technology.",
      body:
        "Leadership and resilience; fatherhood and patience; photography, Formula 1, philosophy and relentless curiosity. Behind every number there is a person, a story and a meaning.",
      chips: ["Leadership", "Resilience", "Fatherhood", "Photography", "Formula 1", "Philosophy", "Learning"],
    },
    contact: {
      kicker: "Let's talk",
      title: "If you want to grow a company, build a system or turn an idea into reality — let's talk.",
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
