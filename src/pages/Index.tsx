import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const PORTFOLIO = [
  {
    id: 1,
    title: "Квартира на Невском",
    type: "Квартира",
    area: "87 м²",
    duration: "45 дней",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/c4acd812-2a24-49be-b814-ee90a3c494b4.jpg",
    tag: "apartment",
  },
  {
    id: 2,
    title: "Кухня в стиле loft",
    type: "Кухня",
    area: "22 м²",
    duration: "18 дней",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/15662b00-adcf-4c79-9942-4a3d18d63268.jpg",
    tag: "kitchen",
  },
  {
    id: 3,
    title: "Ванная комната Premium",
    type: "Ванная",
    area: "14 м²",
    duration: "21 день",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/e2677697-0a8c-4001-a457-85cd39ead2b7.jpg",
    tag: "bathroom",
  },
  {
    id: 4,
    title: "Офис технологической компании",
    type: "Офис",
    area: "320 м²",
    duration: "60 дней",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/9a54c10b-83d0-4199-8e09-703d64c1fd9f.jpg",
    tag: "office",
  },
];

const REVIEWS = [
  {
    name: "Анастасия В.",
    role: "Владелец квартиры",
    text: "Команда выполнила ремонт точно в срок. Качество отделки превзошло все ожидания — каждая деталь продумана до мелочей. Рекомендую всем!",
    stars: 5,
    avatar: "АВ",
  },
  {
    name: "Дмитрий К.",
    role: "Директор компании",
    text: "Доверили ремонт офиса и не пожалели. Работали быстро, чисто, без лишних вопросов. Итог — современный стильный офис, который впечатляет клиентов.",
    stars: 5,
    avatar: "ДК",
  },
  {
    name: "Марина С.",
    role: "Дизайнер интерьера",
    text: "Сотрудничаем как подрядчики уже 3 года. Мастера умеют воплощать самые сложные решения, понимают дизайн и не искажают авторский замысел.",
    stars: 5,
    avatar: "МС",
  },
  {
    name: "Алексей П.",
    role: "Собственник бизнеса",
    text: "Отличное соотношение цена/качество по тарифу «Стандарт». Сметы не раздуваются, лишнего не навязывают. Буду обращаться снова.",
    stars: 5,
    avatar: "АП",
  },
];

const TEAM = [
  { name: "Роман Захаров", role: "Главный прораб", exp: "12 лет", emoji: "👷" },
  { name: "Игорь Смирнов", role: "Дизайнер интерьеров", exp: "9 лет", emoji: "🎨" },
  { name: "Виктор Лебедев", role: "Мастер-отделочник", exp: "15 лет", emoji: "🔧" },
  { name: "Ольга Фёдорова", role: "Менеджер проектов", exp: "7 лет", emoji: "📋" },
];

const TARIFFS = [
  {
    name: "Эконом",
    price: "от 3 500",
    unit: "₽/м²",
    popular: false,
    features: [
      "Выравнивание стен и потолков",
      "Укладка напольных покрытий",
      "Покраска/поклейка обоев",
      "Монтаж дверей",
      "Гарантия 1 год",
    ],
    highlight: false,
  },
  {
    name: "Стандарт",
    price: "от 6 000",
    unit: "₽/м²",
    popular: true,
    features: [
      "Всё из пакета «Эконом»",
      "Дизайн-проект в подарок",
      "Сантехнические работы",
      "Электромонтаж",
      "Гарантия 2 года",
    ],
    highlight: true,
  },
  {
    name: "Премиум",
    price: "от 12 000",
    unit: "₽/м²",
    popular: false,
    features: [
      "Всё из пакета «Стандарт»",
      "Авторский дизайн-проект",
      "Умный дом (базовый)",
      "Закупка материалов",
      "Гарантия 3 года",
    ],
    highlight: false,
  },
];

const BLOG = [
  {
    title: "Как выбрать отделочные материалы и не потратить лишнего",
    date: "28 марта 2026",
    tag: "Советы",
    read: "5 мин",
  },
  {
    title: "Ремонт под ключ vs частичный: что выгоднее в 2026 году",
    date: "15 марта 2026",
    tag: "Аналитика",
    read: "7 мин",
  },
  {
    title: "Топ-5 ошибок при ремонте ванной комнаты",
    date: "3 марта 2026",
    tag: "Ошибки",
    read: "4 мин",
  },
];

const VACANCIES = [
  { title: "Мастер-отделочник", salary: "80 000–120 000 ₽", type: "Полная занятость" },
  { title: "Прораб", salary: "100 000–150 000 ₽", type: "Полная занятость" },
  { title: "Менеджер по продажам", salary: "60 000–90 000 ₽", type: "Гибкий график" },
];

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const filters = [
    { key: "all", label: "Все работы" },
    { key: "apartment", label: "Квартиры" },
    { key: "kitchen", label: "Кухни" },
    { key: "bathroom", label: "Ванные" },
    { key: "office", label: "Офисы" },
  ];

  const filtered =
    activeFilter === "all"
      ? PORTFOLIO
      : PORTFOLIO.filter((p) => p.tag === activeFilter);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#portfolio", label: "Портфолио" },
    { href: "#tariffs", label: "Тарифы" },
    { href: "#reviews", label: "Отзывы" },
    { href: "#team", label: "Команда" },
    { href: "#blog", label: "Блог" },
    { href: "#promo", label: "Акции" },
    { href: "#about", label: "О нас" },
    { href: "#contacts", label: "Контакты" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="font-oswald font-bold text-white text-sm">М</span>
            </div>
            <span className="font-oswald font-bold text-xl tracking-widest text-foreground">МАСТЕР</span>
          </a>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors font-golos">
                {l.label}
              </a>
            ))}
          </div>

          <a href="#contacts" className="hidden lg:flex items-center gap-2 bg-primary text-white font-golos font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-all glow-red text-sm">
            <Icon name="Phone" size={14} />
            Заказать звонок
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-foreground p-2">
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-muted-foreground hover:text-foreground py-2 font-golos transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#contacts" className="bg-primary text-white font-semibold px-4 py-3 rounded-lg text-center mt-2">
              Заказать звонок
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden grid-bg bg-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="animate-pulse-slow absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/8 blur-3xl" />
          <div className="animate-pulse-slow absolute bottom-0 right-0 w-80 h-80 rounded-full bg-primary/6 blur-3xl" style={{ animationDelay: "2s" }} />
        </div>

        <div className="animate-float absolute top-24 right-[12%] w-14 h-14 border border-primary/20 rounded-xl rotate-12 opacity-60" />
        <div className="animate-float-delayed absolute top-40 right-[6%] w-6 h-6 bg-primary/15 rounded-full" />
        <div className="animate-float absolute bottom-32 left-[8%] w-10 h-10 border border-primary/20 rounded-full opacity-50" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-20 pb-12 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-golos mb-6 animate-slide-up stagger-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Принимаем заявки — срок сдачи от 14 дней
            </div>

            <h1 className="font-oswald text-5xl md:text-7xl font-bold leading-none mb-6 animate-slide-up stagger-2 text-foreground">
              РЕМОНТ,<br />
              <span className="text-primary text-glow-red">КОТОРЫЙ</span><br />
              ГОВОРИТ<br />
              САМ ЗА СЕБЯ
            </h1>

            <p className="font-golos text-muted-foreground text-lg mb-8 max-w-md leading-relaxed animate-slide-up stagger-3">
              Профессиональный ремонт квартир, офисов и коммерческих помещений.
              Фиксированная смета, гарантия результата, сдача в срок.
            </p>

            <div className="flex flex-wrap gap-4 animate-slide-up stagger-4">
              <a href="#contacts" className="flex items-center gap-2 bg-primary text-white font-golos font-bold px-8 py-4 rounded-xl hover:bg-primary/90 transition-all glow-red text-base">
                Получить расчёт
                <Icon name="ArrowRight" size={18} />
              </a>
              <a href="#portfolio" className="flex items-center gap-2 border border-border text-foreground font-golos px-8 py-4 rounded-xl hover:border-primary/40 transition-all text-base bg-white">
                <Icon name="Play" size={16} className="text-primary" />
                Смотреть работы
              </a>
            </div>

            <div className="flex gap-8 mt-12 animate-slide-up stagger-5">
              {[
                { val: "800+", label: "Проектов" },
                { val: "12", label: "Лет опыта" },
                { val: "98%", label: "Довольных клиентов" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-oswald text-3xl font-bold text-primary">{s.val}</div>
                  <div className="font-golos text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative hidden lg:block animate-slide-up stagger-3">
            <div className="relative w-full aspect-square max-w-lg ml-auto">
              <img
                src="https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/c4acd812-2a24-49be-b814-ee90a3c494b4.jpg"
                alt="Ремонт"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-black/8" />

              <div className="absolute -bottom-4 -left-8 bg-white border border-border rounded-xl px-5 py-3 flex items-center gap-3 shadow-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-oswald text-foreground font-semibold text-sm">Гарантия до 3 лет</div>
                  <div className="font-golos text-muted-foreground text-xs">На все виды работ</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-white border border-border rounded-xl px-4 py-2 flex items-center gap-2 shadow-lg">
                <Icon name="Clock" size={16} className="text-primary" />
                <span className="font-golos text-foreground text-sm font-semibold">Сдача в срок</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse-slow">
          <span className="font-golos text-xs text-muted-foreground">Скролл</span>
          <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
        </div>
      </section>

      {/* TICKER */}
      <div className="bg-primary py-3 overflow-hidden">
        <div className="ticker-inner flex gap-12 text-white font-oswald font-semibold text-sm tracking-wider">
          {Array(6).fill(["РЕМОНТ ПОД КЛЮЧ", "ДИЗАЙН-ПРОЕКТ", "СДАЧА В СРОК", "ГАРАНТИЯ 3 ГОДА", "800+ ОБЪЕКТОВ", "БЕСПЛАТНЫЙ ЗАМЕР"]).flat().map((t, i) => (
            <span key={i} className="shrink-0">• {t}</span>
          ))}
        </div>
      </div>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-primary font-golos text-sm font-semibold tracking-wider uppercase">Наши работы</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mt-2">ПОРТФОЛИО</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`px-4 py-2 rounded-lg font-golos text-sm transition-all ${activeFilter === f.key ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((p) => (
            <div key={p.id} className="portfolio-card relative overflow-hidden rounded-2xl bg-card border border-border group cursor-pointer card-hover">
              <div className="overflow-hidden aspect-[4/3]">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-500" />
              </div>
              <div className="portfolio-overlay absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent opacity-0 transition-opacity duration-300 flex flex-col justify-end p-6">
                <h3 className="font-oswald text-white text-2xl font-bold">{p.title}</h3>
                <div className="flex gap-4 mt-2">
                  <span className="font-golos text-sm text-red-300">{p.area}</span>
                  <span className="font-golos text-sm text-white/70">{p.duration}</span>
                </div>
              </div>
              <div className="p-5 bg-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-oswald text-foreground text-xl font-semibold">{p.title}</h3>
                    <p className="font-golos text-muted-foreground text-sm mt-1">{p.type} · {p.area} · {p.duration}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Icon name="ArrowUpRight" size={18} className="text-muted-foreground group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TARIFFS */}
      <section id="tariffs" className="py-24 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-golos text-sm font-semibold tracking-wider uppercase">Прозрачные цены</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mt-2">ТАРИФЫ</h2>
            <p className="font-golos text-muted-foreground mt-4 max-w-lg mx-auto">Фиксированная стоимость, без скрытых доплат. Выберите подходящий пакет или обсудите индивидуальные условия.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TARIFFS.map((t) => (
              <div key={t.name} className={`relative rounded-2xl border-2 bg-white p-8 card-hover flex flex-col ${t.highlight ? "border-primary glow-red" : "border-border"}`}>
                {t.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white font-oswald font-bold px-6 py-1.5 rounded-full text-sm tracking-wider">
                    ПОПУЛЯРНЫЙ
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-oswald text-2xl font-bold text-foreground mb-1">{t.name}</div>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="font-oswald text-4xl font-bold text-primary">{t.price}</span>
                    <span className="font-golos text-muted-foreground text-sm">{t.unit}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 font-golos text-sm text-foreground">
                        <Icon name="Check" size={16} className="text-primary mt-0.5 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={`w-full py-3 rounded-xl font-golos font-semibold transition-all ${t.highlight ? "bg-primary text-white hover:bg-primary/90" : "border border-primary text-primary hover:bg-primary hover:text-white"}`}>
                  Выбрать пакет
                </button>
              </div>
            ))}
          </div>

          <p className="text-center font-golos text-muted-foreground text-sm mt-8">
            Нужен индивидуальный расчёт? <a href="#contacts" className="text-primary hover:underline">Свяжитесь с нами</a>
          </p>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-golos text-sm font-semibold tracking-wider uppercase">Клиенты о нас</span>
          <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mt-2">ОТЗЫВЫ</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {REVIEWS.map((r, i) => (
            <div key={i} className="bg-white border border-border rounded-2xl p-8 card-hover">
              <div className="flex gap-1 mb-4">
                {Array(r.stars).fill(0).map((_, j) => (
                  <Icon key={j} name="Star" size={16} className="text-primary" />
                ))}
              </div>
              <p className="font-golos text-foreground leading-relaxed mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-oswald text-primary font-bold text-sm">{r.avatar}</span>
                </div>
                <div>
                  <div className="font-golos font-semibold text-foreground">{r.name}</div>
                  <div className="font-golos text-muted-foreground text-xs">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-24 bg-muted/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-golos text-sm font-semibold tracking-wider uppercase">Наши специалисты</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mt-2">КОМАНДА</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m, i) => (
              <div key={i} className="bg-white border border-border rounded-2xl p-6 text-center card-hover group">
                <div className="w-20 h-20 bg-primary/8 rounded-2xl flex items-center justify-center mx-auto mb-4 text-4xl group-hover:bg-primary/15 transition-colors">
                  {m.emoji}
                </div>
                <h3 className="font-oswald text-foreground font-bold text-lg">{m.name}</h3>
                <p className="font-golos text-primary text-sm mt-1">{m.role}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full">
                  <Icon name="Briefcase" size={12} className="text-muted-foreground" />
                  <span className="font-golos text-xs text-muted-foreground">Опыт: {m.exp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-primary font-golos text-sm font-semibold tracking-wider uppercase">Полезное</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mt-2">БЛОГ</h2>
          </div>
          <a href="#" className="font-golos text-primary text-sm hover:underline flex items-center gap-1">
            Все статьи <Icon name="ArrowRight" size={14} />
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOG.map((b, i) => (
            <div key={i} className="bg-white border border-border rounded-2xl p-6 card-hover cursor-pointer group">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-primary/10 text-primary font-golos text-xs px-3 py-1 rounded-full">{b.tag}</span>
                <span className="font-golos text-xs text-muted-foreground flex items-center gap-1">
                  <Icon name="Clock" size={12} />{b.read}
                </span>
              </div>
              <h3 className="font-oswald text-foreground text-lg font-semibold leading-snug mb-4 group-hover:text-primary transition-colors">{b.title}</h3>
              <div className="flex items-center justify-between">
                <span className="font-golos text-xs text-muted-foreground">{b.date}</span>
                <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO */}
      <section id="promo" className="py-16 bg-muted/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-golos text-sm font-semibold tracking-wider uppercase">Выгодные предложения</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mt-2">АКЦИИ</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-primary/30 rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-primary text-white font-oswald font-bold text-sm px-3 py-1 rounded-full">
                До 30 апреля
              </div>
              <Icon name="Gift" size={36} className="text-primary mb-4" />
              <h3 className="font-oswald text-foreground text-2xl font-bold mb-2">Дизайн-проект в подарок</h3>
              <p className="font-golos text-muted-foreground">При заказе ремонта от 50 м² — разработка дизайн-проекта бесплатно. Экономия до 60 000 ₽.</p>
              <a href="#contacts" className="mt-6 inline-flex items-center gap-2 bg-primary text-white font-golos font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-all">
                Узнать подробности <Icon name="ArrowRight" size={16} />
              </a>
            </div>

            <div className="bg-white border-2 border-border rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-secondary text-foreground font-oswald font-bold text-sm px-3 py-1 rounded-full">
                Постоянно
              </div>
              <Icon name="Percent" size={36} className="text-primary mb-4" />
              <h3 className="font-oswald text-foreground text-2xl font-bold mb-2">Скидка 10% повторным клиентам</h3>
              <p className="font-golos text-muted-foreground">Обратились к нам снова или привели друга — получите скидку 10% на следующий заказ.</p>
              <a href="#contacts" className="mt-6 inline-flex items-center gap-2 border border-primary text-primary font-golos font-semibold px-6 py-3 rounded-xl hover:bg-primary hover:text-white transition-all">
                Узнать подробности <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-primary font-golos text-sm font-semibold tracking-wider uppercase">Кто мы</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">О НАС</h2>
            <p className="font-golos text-muted-foreground leading-relaxed mb-6">
              Компания МАСТЕР работает на рынке ремонтных услуг с 2014 года. За это время мы выполнили более 800 проектов — от небольших косметических ремонтов до полной реконструкции коммерческих помещений.
            </p>
            <p className="font-golos text-muted-foreground leading-relaxed mb-8">
              Наш принцип прост: фиксированная смета, прозрачный процесс, сдача точно в срок. Мы не берём аванс больше 30%, а финальный расчёт только после вашей приёмки.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "Award", text: "Лицензированные специалисты" },
                { icon: "TrendingUp", text: "Работаем с 2014 года" },
                { icon: "Shield", text: "Гарантия на все работы" },
                { icon: "FileText", text: "Официальный договор" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-3 bg-white border border-border rounded-xl p-4">
                  <Icon name={f.icon} size={20} className="text-primary shrink-0" />
                  <span className="font-golos text-sm text-foreground">{f.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { val: "800+", label: "Проектов завершено" },
              { val: "12", label: "Лет на рынке" },
              { val: "98%", label: "Клиентов рекомендуют нас" },
              { val: "3", label: "Года гарантии (Премиум)" },
            ].map((s) => (
              <div key={s.label} className="bg-white border border-border rounded-2xl p-6 text-center card-hover">
                <div className="font-oswald text-4xl font-bold text-primary mb-2">{s.val}</div>
                <div className="font-golos text-muted-foreground text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VACANCIES */}
      <section id="vacancies" className="py-16 bg-muted/40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-primary font-golos text-sm font-semibold tracking-wider uppercase">Присоединяйтесь</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mt-2">ВАКАНСИИ</h2>
          </div>
          <div className="space-y-4">
            {VACANCIES.map((v, i) => (
              <div key={i} className="bg-white border border-border rounded-2xl p-6 flex items-center justify-between card-hover group cursor-pointer">
                <div>
                  <h3 className="font-oswald text-foreground text-xl font-semibold group-hover:text-primary transition-colors">{v.title}</h3>
                  <div className="flex gap-4 mt-2">
                    <span className="font-golos text-primary text-sm font-semibold">{v.salary}</span>
                    <span className="font-golos text-muted-foreground text-sm">{v.type}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Icon name="ArrowUpRight" size={18} className="text-muted-foreground group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-primary font-golos text-sm font-semibold tracking-wider uppercase">Связаться с нами</span>
            <h2 className="font-oswald text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">КОНТАКТЫ</h2>
            <p className="font-golos text-muted-foreground mb-8">Оставьте заявку и мы свяжемся с вами в течение 15 минут. Бесплатный выезд мастера на замер.</p>
            <div className="space-y-4 mb-8">
              {[
                { icon: "Phone", label: "Телефон", val: "+7 (999) 123-45-67" },
                { icon: "Mail", label: "Email", val: "info@master-remont.ru" },
                { icon: "MapPin", label: "Адрес", val: "Москва, ул. Строителей, 15" },
                { icon: "Clock", label: "Режим работы", val: "Пн–Вс, 8:00–20:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={18} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-golos text-xs text-muted-foreground">{c.label}</div>
                    <div className="font-golos text-foreground font-semibold">{c.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
            <h3 className="font-oswald text-foreground text-2xl font-bold mb-6">Получить бесплатный расчёт</h3>
            <div className="space-y-4">
              <div>
                <label className="font-golos text-sm text-muted-foreground mb-1.5 block">Ваше имя</label>
                <input type="text" placeholder="Александр" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 font-golos text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="font-golos text-sm text-muted-foreground mb-1.5 block">Телефон</label>
                <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 font-golos text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors" />
              </div>
              <div>
                <label className="font-golos text-sm text-muted-foreground mb-1.5 block">Тип помещения</label>
                <select className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 font-golos text-foreground focus:outline-none focus:border-primary/50 transition-colors">
                  <option value="">Выберите тип</option>
                  <option>Квартира</option>
                  <option>Офис</option>
                  <option>Коммерческое помещение</option>
                  <option>Частный дом</option>
                </select>
              </div>
              <div>
                <label className="font-golos text-sm text-muted-foreground mb-1.5 block">Комментарий</label>
                <textarea rows={3} placeholder="Опишите объект и пожелания..." className="w-full bg-muted/50 border border-border rounded-xl px-4 py-3 font-golos text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors resize-none" />
              </div>
              <button className="w-full bg-primary text-white font-golos font-bold py-4 rounded-xl hover:bg-primary/90 transition-all glow-red text-base flex items-center justify-center gap-2">
                Отправить заявку
                <Icon name="ArrowRight" size={18} />
              </button>
              <p className="font-golos text-xs text-muted-foreground text-center">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                  <span className="font-oswald font-bold text-white text-sm">М</span>
                </div>
                <span className="font-oswald font-bold text-xl tracking-widest text-foreground">МАСТЕР</span>
              </div>
              <p className="font-golos text-muted-foreground text-sm leading-relaxed">Профессиональный ремонт под ключ с 2014 года. Более 800 реализованных проектов.</p>
            </div>
            <div>
              <h4 className="font-oswald text-foreground font-semibold mb-4 tracking-wider">Услуги</h4>
              <ul className="space-y-2">
                {["Ремонт квартир", "Офисный ремонт", "Ванные комнаты", "Дизайн интерьера"].map((s) => (
                  <li key={s}><a href="#" className="font-golos text-muted-foreground text-sm hover:text-primary transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-oswald text-foreground font-semibold mb-4 tracking-wider">Компания</h4>
              <ul className="space-y-2">
                {navLinks.map((l) => (
                  <li key={l.href}><a href={l.href} className="font-golos text-muted-foreground text-sm hover:text-primary transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-oswald text-foreground font-semibold mb-4 tracking-wider">Контакты</h4>
              <div className="space-y-3">
                {[
                  { icon: "Phone", text: "+7 (999) 123-45-67" },
                  { icon: "Mail", text: "info@master-remont.ru" },
                  { icon: "MapPin", text: "Москва, ул. Строителей, 15" },
                ].map((c) => (
                  <p key={c.text} className="font-golos text-muted-foreground text-sm flex items-center gap-2">
                    <Icon name={c.icon} size={14} className="text-primary" /> {c.text}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-golos text-muted-foreground text-sm">© 2026 МАСТЕР. Все права защищены.</p>
            <div className="flex gap-6">
              <a href="#" className="font-golos text-muted-foreground text-sm hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="font-golos text-muted-foreground text-sm hover:text-primary transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
