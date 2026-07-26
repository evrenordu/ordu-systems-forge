export type Lang = "tr" | "de" | "en";

export const translations = {
  tr: {
    nav: {
      about: "Manifesto",
      focus: "Ne İnşa Ederim",
      framework: "ORDU",
      cases: "Vaka Çalışmaları",
      experience: "Deneyim",
      ideas: "Fikirler",
      contact: "İletişim",
    },
    hero: {
      eyebrow: "EVREN ORDU · FRANKFURT / GERMANY",
      brand: "THE SYSTEM ARCHITECT",
      headline: "Şirketleri büyüten sistemler kurarım.",
      role: "Stratejik Lider · Sistem Mimarı · AI & Dijital Dönüşüm",
      support:
        "İnsanları, süreçleri, veriyi ve teknolojiyi tek bir çalışan sisteme dönüştürüyorum.",
      ctaPrimary: "Çalışmalarımı Keşfedin",
      ctaSecondary: "Bir Görüşme Başlatın",
      scroll: "Kaydırın",
    },
    about: {
      kicker: "Manifesto",
      title: "Başkalarının normal kabul ettiği karmaşayı görürüm.",
      blocks: [
        {
          h: "Başkalarının normal kabul ettiği şeyi görürüm.",
          t: "Dağınık süreçler. Görünmeyen maliyetler. Birbirinden kopuk ekipler. Veriye dayanmayan kararlar.",
        },
        {
          h: "Sonra karmaşayı berraklığa dönüştürürüm.",
          t: "İnsanları hizalarım. Süreçleri tanımlarım. Veriyi görünür hâle getiririm. Teknolojiyi sistemin içine yerleştiririm.",
        },
        {
          h: "Sonuç sadece iyileşme değildir.",
          t: "Kontrolünü kaybetmeden büyüyebilen, ölçülebilir ve devredilebilir bir sistem.",
        },
      ],
      principle: "İnsan · Süreç · Veri · Teknoloji — aynı sistemde.",
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
      kicker: "Öne Çıkan Vaka Çalışmaları",
      title: "Fikirden sisteme, sistemden ölçeğe.",
      problemLabel: "Problem",
      systemLabel: "Sistem",
      impactLabel: "Etki",
      items: [
        {
          tag: "BauERP",
          t: "İnşaatın operasyonel omurgası.",
          problem: "Saha, satın alma, bütçe, sözleşme ve finans birbirinden kopuk çalışıyor.",
          system: "Tekliften faturaya, şantiyeden yönetime tek veri omurgası.",
          impact: "Daha fazla görünürlük. Daha hızlı karar. Daha güçlü mali kontrol.",
        },
        {
          tag: "AIOS",
          t: "Şirket bilgisini işletim sistemine dönüştürmek.",
          problem: "Bilgi insanlarda ve dağınık dosyalarda kalıyor.",
          system: "Şirket hafızası, AI, SOP, karar desteği ve iş akışları tek yapı içinde.",
          impact: "Daha hızlı onboarding, daha tutarlı kararlar ve kurumsal hafıza.",
        },
        {
          tag: "Multi-Site Transformation",
          t: "Bireysel lokasyonlardan tek işletim modeline.",
          problem: "Her lokasyon farklı çalışıyor.",
          system: "KPI, iş gücü planlama, raporlama ve standart operasyon modeli.",
          impact: "Kontrol, karşılaştırılabilirlik ve ölçeklenebilir büyüme.",
        },
      ],
      supportingLabel: "Destekleyen Projeler",
      supporting: [
        { t: "Digital Transformation", d: "Süreçlerin AI ile yeniden tasarlanması ve ölçülebilir verim." },
        { t: "International Real Estate Marketing", d: "Sınır ötesi gayrimenkul pazarlaması ve satış operasyonu." },
      ],
      note: "Detaylı vaka çalışmaları talep üzerine paylaşılır.",
    },
    ideas: {
      kicker: "Düşünce Liderliği",
      title: "Fikirler. Sistemler. Gelecek.",
      intro: "Gündemi değil, sistemi konuşan yazılar. Pratik, sahadan çıkmış, uygulanabilir düşünce.",
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
      soon: "Yakında",
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
      tag: "Built around clarity, courage and systems.",
      rights: "Tüm hakları saklıdır.",
    },
  },
  de: {
    nav: {
      about: "Manifest",
      focus: "Was ich baue",
      framework: "ORDU",
      cases: "Fallstudien",
      experience: "Erfahrung",
      ideas: "Ideen",
      contact: "Kontakt",
    },
    hero: {
      eyebrow: "EVREN ORDU · FRANKFURT / GERMANY",
      brand: "THE SYSTEM ARCHITECT",
      headline: "Ich baue Systeme, die Unternehmen wachsen lassen.",
      role: "Strategischer Leader · Systemarchitekt · KI & Digitale Transformation",
      support:
        "Ich verbinde Menschen, Prozesse, Daten und Technologie zu einem funktionierenden System.",
      ctaPrimary: "Projekte entdecken",
      ctaSecondary: "Gespräch starten",
      scroll: "Scrollen",
    },
    about: {
      kicker: "Manifest",
      title: "Ich sehe die Komplexität, die andere für normal halten.",
      blocks: [
        {
          h: "Ich sehe, was andere als normal akzeptieren.",
          t: "Fragmentierte Prozesse. Unsichtbare Kosten. Getrennte Teams. Entscheidungen ohne Daten.",
        },
        {
          h: "Dann verwandle ich Komplexität in Klarheit.",
          t: "Ich richte Menschen aus. Ich definiere Prozesse. Ich mache Daten sichtbar. Ich verankere Technologie im System.",
        },
        {
          h: "Das Ergebnis ist mehr als Verbesserung.",
          t: "Ein messbares, übergabefähiges System, das wachsen kann, ohne die Kontrolle zu verlieren.",
        },
      ],
      principle: "Mensch · Prozess · Daten · Technologie — im selben System.",
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
      kicker: "Ausgewählte Fallstudien",
      title: "Von der Idee zum System, vom System zur Skalierung.",
      problemLabel: "Problem",
      systemLabel: "System",
      impactLabel: "Wirkung",
      items: [
        {
          tag: "BauERP",
          t: "Das operative Rückgrat für den Bau.",
          problem: "Baustelle, Einkauf, Budget, Vertrag und Finance arbeiten getrennt.",
          system: "Vom Angebot zur Rechnung, von der Baustelle zur Geschäftsführung — ein Datenrückgrat.",
          impact: "Mehr Sichtbarkeit. Schnellere Entscheidungen. Stärkere Finanzkontrolle.",
        },
        {
          tag: "AIOS",
          t: "Unternehmenswissen wird zum Betriebssystem.",
          problem: "Wissen bleibt in Köpfen und verstreuten Dateien.",
          system: "Unternehmensgedächtnis, KI, SOPs, Entscheidungsunterstützung und Workflows in einer Struktur.",
          impact: "Schnelleres Onboarding, konsistentere Entscheidungen, echtes Unternehmensgedächtnis.",
        },
        {
          tag: "Multi-Site Transformation",
          t: "Von einzelnen Standorten zu einem Betriebsmodell.",
          problem: "Jeder Standort arbeitet anders.",
          system: "KPIs, Personalplanung, Reporting und Standard-Betriebsmodell.",
          impact: "Kontrolle, Vergleichbarkeit und skalierbares Wachstum.",
        },
      ],
      supportingLabel: "Unterstützende Projekte",
      supporting: [
        { t: "Digital Transformation", d: "Prozesse mit KI neu gedacht — für messbare Produktivität." },
        { t: "International Real Estate Marketing", d: "Grenzüberschreitendes Immobilien-Marketing und Vertrieb." },
      ],
      note: "Detaillierte Fallstudien auf Anfrage.",
    },
    ideas: {
      kicker: "Thought Leadership",
      title: "Ideen. Systeme. Zukunft.",
      intro: "Texte, die nicht Trends, sondern Systeme behandeln. Praktisch, aus der Praxis, umsetzbar.",
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
      soon: "Bald",
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
      tag: "Built around clarity, courage and systems.",
      rights: "Alle Rechte vorbehalten.",
    },
  },
  en: {
    nav: {
      about: "Manifesto",
      focus: "What I Build",
      framework: "ORDU",
      cases: "Case Studies",
      experience: "Experience",
      ideas: "Ideas",
      contact: "Contact",
    },
    hero: {
      eyebrow: "EVREN ORDU · FRANKFURT / GERMANY",
      brand: "THE SYSTEM ARCHITECT",
      headline: "I build systems that build companies.",
      role: "Strategic Leader · System Architect · AI & Digital Transformation",
      support:
        "I turn people, process, data and technology into one operating system.",
      ctaPrimary: "Explore My Work",
      ctaSecondary: "Start a Conversation",
      scroll: "Scroll",
    },
    about: {
      kicker: "Manifesto",
      title: "I see the complexity that others accept as normal.",
      blocks: [
        {
          h: "I see what others accept as normal.",
          t: "Fragmented processes. Invisible costs. Disconnected teams. Decisions without data.",
        },
        {
          h: "Then I turn complexity into clarity.",
          t: "I align people. I define processes. I make data visible. I embed technology inside the system.",
        },
        {
          h: "The result is not just improvement.",
          t: "A measurable, transferable system that can grow without losing control.",
        },
      ],
      principle: "People · Process · Data · Technology — inside the same system.",
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
      kicker: "Featured Case Studies",
      title: "From idea to system, from system to scale.",
      problemLabel: "Problem",
      systemLabel: "System",
      impactLabel: "Impact",
      items: [
        {
          tag: "BauERP",
          t: "The operating backbone for construction.",
          problem: "Site, procurement, budget, contract and finance run in disconnected silos.",
          system: "From quote to invoice, from site to management — one data backbone.",
          impact: "More visibility. Faster decisions. Stronger financial control.",
        },
        {
          tag: "AIOS",
          t: "Turning company knowledge into an operating system.",
          problem: "Knowledge lives in people's heads and scattered files.",
          system: "Company memory, AI, SOPs, decision support and workflows inside one structure.",
          impact: "Faster onboarding, more consistent decisions and real institutional memory.",
        },
        {
          tag: "Multi-Site Transformation",
          t: "From individual locations to one operating model.",
          problem: "Every location works differently.",
          system: "KPIs, workforce planning, reporting and a standard operating model.",
          impact: "Control, comparability and scalable growth.",
        },
      ],
      supportingLabel: "Supporting Projects",
      supporting: [
        { t: "Digital Transformation", d: "Processes redesigned with AI to deliver measurable productivity." },
        { t: "International Real Estate Marketing", d: "Cross-border real estate marketing and sales operations." },
      ],
      note: "Detailed case studies available upon request.",
    },
    ideas: {
      kicker: "Thought Leadership",
      title: "Ideas. Systems. Future.",
      intro: "Writing that discusses systems, not trends. Practical thinking, grounded in operations.",
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
      soon: "Soon",
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
