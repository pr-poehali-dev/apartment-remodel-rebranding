import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ─── DATA ─── */
const PORTFOLIO = [
  {
    id: 1, tag: "apartment",
    num: "01",
    title: "Квартира на Пречистенке",
    type: "Жилой интерьер",
    area: "112 м²", duration: "52 дня",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/24eeb47a-0d46-4c11-9ecd-51cbb4cb6a17.jpg",
  },
  {
    id: 2, tag: "kitchen",
    num: "02",
    title: "Кухня в стиле loft",
    type: "Кухня",
    area: "22 м²", duration: "18 дней",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/7ff66fa8-acfe-4369-a7d0-2fcd9c6a7d95.jpg",
  },
  {
    id: 3, tag: "bathroom",
    num: "03",
    title: "Ванная комната Premium",
    type: "Санузел",
    area: "14 м²", duration: "21 день",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/e2677697-0a8c-4001-a457-85cd39ead2b7.jpg",
  },
  {
    id: 4, tag: "office",
    num: "04",
    title: "Офис технологической компании",
    type: "Коммерческий интерьер",
    area: "320 м²", duration: "60 дней",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/ef3caff6-630d-4ddc-8de6-42f1ba500036.jpg",
  },
];

const REVIEWS = [
  { name: "Анастасия Воронова", role: "Частный клиент", avatar: "АВ",
    text: "Ремонт выполнен точно в срок. Качество отделки превзошло ожидания — каждая деталь продумана. Команда работает как часы." },
  { name: "Дмитрий Ковалёв", role: "CEO, Ковалёв Групп", avatar: "ДК",
    text: "Доверили ремонт офиса и не пожалели. Работали чисто, без вопросов. Итог — пространство, которое впечатляет партнёров." },
  { name: "Марина Соловьёва", role: "Дизайнер интерьера", avatar: "МС",
    text: "Сотрудничаем три года. Мастера умеют воплощать сложные авторские решения — не искажают замысел и предлагают улучшения." },
  { name: "Алексей Петров", role: "Инвестор в недвижимость", avatar: "АП",
    text: "Прозрачная смета, никакого раздувания бюджета. Уже четыре объекта сдали — всегда в срок и в рамках договора." },
];

const TEAM = [
  { name: "Роман Захаров", role: "Главный прораб", exp: "12 лет", emoji: "👷" },
  { name: "Игорь Смирнов", role: "Дизайнер интерьеров", exp: "9 лет", emoji: "🎨" },
  { name: "Виктор Лебедев", role: "Мастер-отделочник", exp: "15 лет", emoji: "🔧" },
  { name: "Ольга Фёдорова", role: "Менеджер проектов", exp: "7 лет", emoji: "📋" },
];

const TARIFFS = [
  {
    name: "Базовый", price: "от 3 500", popular: false,
    features: ["Выравнивание стен и потолков", "Укладка напольных покрытий", "Покраска / поклейка обоев", "Монтаж дверей", "Гарантия 1 год"],
  },
  {
    name: "Стандарт", price: "от 6 000", popular: true,
    features: ["Всё из пакета «Базовый»", "Дизайн-проект в подарок", "Сантехнические работы", "Электромонтаж", "Гарантия 2 года"],
  },
  {
    name: "Премиум", price: "от 12 000", popular: false,
    features: ["Всё из пакета «Стандарт»", "Авторский дизайн-проект", "Умный дом (базовый)", "Закупка материалов", "Гарантия 3 года"],
  },
];

const BLOG = [
  { title: "Как выбрать отделочные материалы и не потратить лишнего", date: "28 марта 2026", tag: "Советы", read: "5 мин" },
  { title: "Ремонт под ключ vs частичный: что выгоднее в 2026 году", date: "15 марта 2026", tag: "Аналитика", read: "7 мин" },
  { title: "Топ-5 ошибок при ремонте ванной комнаты", date: "3 марта 2026", tag: "Опыт", read: "4 мин" },
];

const FILTERS = [
  { key: "all", label: "Все" },
  { key: "apartment", label: "Квартиры" },
  { key: "kitchen", label: "Кухни" },
  { key: "bathroom", label: "Ванные" },
  { key: "office", label: "Офисы" },
];

const NAV = [
  { href: "#portfolio", label: "Работы" },
  { href: "#tariffs",   label: "Тарифы" },
  { href: "#reviews",   label: "Отзывы" },
  { href: "#team",      label: "Команда" },
  { href: "#blog",      label: "Блог" },
  { href: "#about",     label: "О нас" },
  { href: "#contacts",  label: "Контакты" },
];

/* ─── COMPONENT ─── */
export default function Index() {
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const filtered = filter === "all" ? PORTFOLIO : PORTFOLIO.filter(p => p.tag === filter);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ═══ NAV ═══ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/96 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary flex items-center justify-center">
              <span className="font-ibm font-semibold text-white text-xs tracking-widest">М</span>
            </div>
            <span className="label-caps text-foreground tracking-[0.18em]">Мастер</span>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV.map(l => (
              <a key={l.href} href={l.href} className="nav-lnk label-caps text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
            ))}
          </div>

          <a href="#contacts" className="hidden lg:inline-flex items-center gap-2 btn-red px-5 py-2.5 label-caps text-white">
            <span>Связаться</span>
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2">
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-6 py-6 flex flex-col gap-5">
            {NAV.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="label-caps text-muted-foreground hover:text-foreground">{l.label}</a>
            ))}
            <a href="#contacts" className="btn-red px-6 py-3 text-center label-caps text-white mt-2">Связаться</a>
          </div>
        )}
      </nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-white">

        {/* Full-bleed image right half */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-[55%] img-zoom anim-reveal d1">
          <img
            src="https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/24eeb47a-0d46-4c11-9ecd-51cbb4cb6a17.jpg"
            alt="Интерьер"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent lg:via-white/30" />
        </div>

        {/* Text content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pb-20 pt-32">
          <p className="label-caps text-primary mb-6 anim-up d2">Ремонт под ключ · Москва</p>

          <h1 className="display text-[clamp(3.5rem,9vw,8rem)] text-foreground mb-10 anim-up d3">
            Пространство,<br />
            <em className="text-primary not-italic">которое</em><br />
            говорит само.
          </h1>

          <p className="font-ibm font-light text-muted-foreground text-base max-w-sm leading-relaxed mb-10 anim-up d4">
            Квартиры, офисы, коммерческие помещения. Фиксированная смета — никаких сюрпризов. Гарантия до трёх лет.
          </p>

          <div className="flex flex-wrap gap-4 anim-up d5">
            <a href="#contacts" className="btn-red inline-flex items-center gap-3 px-8 py-4 label-caps text-white">
              <span>Получить расчёт</span>
              <Icon name="ArrowRight" size={14} />
            </a>
            <a href="#portfolio" className="btn-outline inline-flex items-center gap-3 px-8 py-4 label-caps">
              <span>Смотреть работы</span>
            </a>
          </div>

          {/* Stats strip */}
          <div className="flex gap-12 mt-16 pt-10 border-t border-border anim-up d6">
            {[
              { v: "800+", l: "проектов" },
              { v: "12",   l: "лет опыта" },
              { v: "98%",  l: "рекомендуют" },
            ].map(s => (
              <div key={s.l}>
                <div className="font-cormorant text-4xl font-light text-primary leading-none">{s.v}</div>
                <div className="label-caps text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TICKER ═══ */}
      <div className="bg-primary py-3.5 overflow-hidden">
        <div className="ticker-inner">
          {Array(8).fill(["Ремонт под ключ", "Дизайн-проект", "Сдача в срок", "Гарантия 3 года", "800+ объектов", "Бесплатный замер"]).flat().map((t, i) => (
            <span key={i} className="label-caps text-white/90 px-8">— {t}</span>
          ))}
        </div>
      </div>

      {/* ═══ PORTFOLIO ═══ */}
      <section id="portfolio" className="py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <p className="label-caps text-primary mb-3">Наши работы</p>
            <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)] text-foreground">Избранные<br />проекты</h2>
          </div>
          <div className="flex flex-wrap gap-1">
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-5 py-2 label-caps transition-all duration-300 ${filter === f.key ? "bg-foreground text-white" : "text-muted-foreground hover:text-foreground border border-transparent hover:border-border"}`}
              >{f.label}</button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {filtered.map(p => (
            <div key={p.id} className="group relative bg-white overflow-hidden cursor-pointer">
              <div className="img-zoom aspect-[4/3]">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>
              {/* Hover overlay */}
              <div className="port-ov absolute inset-0 bg-foreground/85 flex flex-col justify-between p-8">
                <span className="label-caps text-white/50">{p.num}</span>
                <div>
                  <p className="label-caps text-primary mb-2">{p.type}</p>
                  <h3 className="font-cormorant text-3xl font-light text-white leading-tight mb-4">{p.title}</h3>
                  <div className="flex gap-6">
                    <span className="label-caps text-white/60">{p.area}</span>
                    <span className="label-caps text-white/60">{p.duration}</span>
                  </div>
                </div>
              </div>
              {/* Number label (always visible) */}
              <div className="absolute top-5 left-5 group-hover:opacity-0 transition-opacity">
                <span className="label-caps text-white/70 bg-black/30 px-2 py-1">{p.num}</span>
              </div>
              {/* Caption below */}
              <div className="p-6 border-t border-border flex items-center justify-between">
                <div>
                  <h3 className="font-ibm font-medium text-foreground text-base">{p.title}</h3>
                  <p className="label-caps text-muted-foreground mt-1">{p.type} · {p.area}</p>
                </div>
                <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ DIVIDER ═══ */}
      <div className="h-px bg-border mx-6 lg:mx-12" />

      {/* ═══ TARIFFS ═══ */}
      <section id="tariffs" className="py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="label-caps text-primary mb-3">Тарифы</p>
          <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)]">Прозрачно<br />и без сюрпризов</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-px bg-border">
          {TARIFFS.map(t => (
            <div key={t.name} className={`relative flex flex-col p-10 lift ${t.popular ? "bg-foreground text-white" : "bg-white"}`}>
              {t.popular && (
                <span className="label-caps text-primary mb-6">Популярный выбор</span>
              )}
              <div className={`label-caps mb-2 ${t.popular ? "text-white/50" : "text-muted-foreground"}`}>{t.name}</div>
              <div className={`font-cormorant text-5xl font-light mb-8 ${t.popular ? "text-white" : "text-foreground"}`}>{t.price}<span className={`text-xl ml-1 ${t.popular ? "text-white/50" : "text-muted-foreground"}`}>₽/м²</span></div>
              
              <ul className="space-y-3 flex-1 mb-10">
                {t.features.map(f => (
                  <li key={f} className={`flex items-start gap-3 font-ibm font-light text-sm ${t.popular ? "text-white/80" : "text-muted-foreground"}`}>
                    <span className={`mt-1 shrink-0 w-1 h-1 rounded-full ${t.popular ? "bg-primary" : "bg-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 label-caps transition-all ${t.popular ? "bg-primary text-white hover:bg-primary/90" : "border border-foreground text-foreground hover:bg-foreground hover:text-white"}`}>
                Выбрать пакет
              </button>
            </div>
          ))}
        </div>

        <p className="font-ibm font-light text-muted-foreground text-sm mt-8">
          Нужен индивидуальный расчёт?{" "}
          <a href="#contacts" className="text-primary underline underline-offset-4">Напишите нам</a>
        </p>
      </section>

      {/* ═══ REVIEWS ═══ */}
      <section id="reviews" className="py-32 bg-muted/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-16">
            <p className="label-caps text-primary mb-3">Отзывы</p>
            <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)]">Говорят<br />клиенты</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-border">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white p-10 lift flex flex-col gap-6">
                <div className="flex gap-1">
                  {Array(5).fill(0).map((_, j) => (
                    <Icon key={j} name="Star" size={12} className="text-primary" />
                  ))}
                </div>
                <p className="font-cormorant text-2xl font-light text-foreground leading-snug">"{r.text}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-border mt-auto">
                  <div className="w-9 h-9 bg-primary/10 flex items-center justify-center">
                    <span className="label-caps text-primary text-[0.6rem]">{r.avatar}</span>
                  </div>
                  <div>
                    <p className="font-ibm font-medium text-sm text-foreground">{r.name}</p>
                    <p className="label-caps text-muted-foreground">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TEAM ═══ */}
      <section id="team" className="py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="label-caps text-primary mb-3">Команда</p>
          <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)]">Люди за<br />проектами</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border">
          {TEAM.map((m, i) => (
            <div key={i} className="bg-white p-8 lift group">
              <div className="w-14 h-14 bg-muted flex items-center justify-center text-3xl mb-6 group-hover:bg-primary/10 transition-colors">
                {m.emoji}
              </div>
              <h3 className="font-ibm font-medium text-foreground">{m.name}</h3>
              <p className="label-caps text-primary mt-1 mb-4">{m.role}</p>
              <p className="label-caps text-muted-foreground">Опыт: {m.exp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ BLOG ═══ */}
      <section id="blog" className="py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
            <div>
              <p className="label-caps text-primary mb-3">Журнал</p>
              <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)]">Полезное<br />о ремонте</h2>
            </div>
            <a href="#" className="label-caps text-primary flex items-center gap-2 hover:gap-4 transition-all">
              Все статьи <Icon name="ArrowRight" size={12} />
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {BLOG.map((b, i) => (
              <div key={i} className="bg-white p-8 lift group cursor-pointer flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="label-caps text-primary">{b.tag}</span>
                  <span className="label-caps text-muted-foreground">{b.read}</span>
                </div>
                <h3 className="font-cormorant text-2xl font-light text-foreground leading-snug flex-1 group-hover:text-primary transition-colors">{b.title}</h3>
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                  <span className="label-caps text-muted-foreground">{b.date}</span>
                  <Icon name="ArrowUpRight" size={14} className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PROMO ═══ */}
      <section id="promo" className="py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-16">
          <p className="label-caps text-primary mb-3">Акции</p>
          <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)]">Выгодные<br />предложения</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          <div className="bg-foreground p-10 flex flex-col">
            <div className="flex items-start justify-between mb-8">
              <Icon name="Gift" size={28} className="text-primary" />
              <span className="label-caps text-white/50 border border-white/20 px-3 py-1.5">До 30 апреля</span>
            </div>
            <h3 className="font-cormorant text-3xl font-light text-white mb-4">Дизайн-проект в подарок</h3>
            <p className="font-ibm font-light text-white/60 text-sm leading-relaxed mb-8">
              При заказе ремонта от 50 м² — разработка дизайн-проекта бесплатно. Экономия до 60 000 ₽.
            </p>
            <a href="#contacts" className="mt-auto btn-red inline-flex items-center gap-3 px-6 py-3.5 label-caps text-white self-start">
              <span>Узнать подробности</span>
              <Icon name="ArrowRight" size={12} />
            </a>
          </div>

          <div className="bg-white p-10 flex flex-col border border-border">
            <div className="flex items-start justify-between mb-8">
              <Icon name="Percent" size={28} className="text-primary" />
              <span className="label-caps text-muted-foreground border border-border px-3 py-1.5">Постоянно</span>
            </div>
            <h3 className="font-cormorant text-3xl font-light text-foreground mb-4">Скидка 10% повторным клиентам</h3>
            <p className="font-ibm font-light text-muted-foreground text-sm leading-relaxed mb-8">
              Обратились снова или привели друга — 10% скидка на следующий заказ автоматически.
            </p>
            <a href="#contacts" className="mt-auto btn-outline inline-flex items-center gap-3 px-6 py-3.5 label-caps self-start">
              <span>Узнать подробности</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" className="py-32 bg-foreground text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <p className="label-caps text-primary mb-6">О нас</p>
              <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)] text-white mb-10">
                Делаем ремонт,<br />а не просто<br /><em className="text-primary not-italic">красим стены.</em>
              </h2>
              <p className="font-ibm font-light text-white/60 leading-relaxed mb-6">
                Компания МАСТЕР работает с 2014 года. За это время — более 800 проектов. От косметики до полной реконструкции коммерческих помещений.
              </p>
              <p className="font-ibm font-light text-white/60 leading-relaxed mb-10">
                Фиксированная смета, прозрачный процесс, сдача в срок. Аванс не более 30%, финальный расчёт после вашей приёмки.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "Award",    text: "Лицензированные специалисты" },
                  { icon: "TrendingUp", text: "Работаем с 2014 года" },
                  { icon: "Shield",   text: "Гарантия на все работы" },
                  { icon: "FileText", text: "Официальный договор" },
                ].map(f => (
                  <div key={f.text} className="flex items-center gap-3 border border-white/10 p-4">
                    <Icon name={f.icon} size={16} className="text-primary shrink-0" />
                    <span className="font-ibm font-light text-sm text-white/70">{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/10">
              {[
                { v: "800+", l: "Проектов завершено" },
                { v: "12",   l: "Лет на рынке" },
                { v: "98%",  l: "Рекомендуют нас" },
                { v: "3",    l: "Года гарантии" },
              ].map(s => (
                <div key={s.l} className="bg-foreground p-8 text-center">
                  <div className="font-cormorant text-5xl font-light text-primary mb-2">{s.v}</div>
                  <p className="label-caps text-white/40">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTACTS ═══ */}
      <section id="contacts" className="py-32 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <p className="label-caps text-primary mb-6">Контакты</p>
            <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)] mb-10">
              Начнём<br />разговор?
            </h2>
            <p className="font-ibm font-light text-muted-foreground mb-10 leading-relaxed">
              Оставьте заявку — ответим в течение 15 минут. Выезд мастера на замер бесплатно.
            </p>
            <div className="space-y-6">
              {[
                { icon: "Phone",  l: "Телефон",      v: "+7 (999) 123-45-67" },
                { icon: "Mail",   l: "Email",         v: "info@master-remont.ru" },
                { icon: "MapPin", l: "Адрес",         v: "Москва, ул. Строителей, 15" },
                { icon: "Clock",  l: "Режим работы",  v: "Пн–Вс, 8:00–20:00" },
              ].map(c => (
                <div key={c.l} className="flex items-center gap-4 pb-6 border-b border-border">
                  <div className="w-9 h-9 bg-primary/8 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={15} className="text-primary" />
                  </div>
                  <div>
                    <p className="label-caps text-muted-foreground">{c.l}</p>
                    <p className="font-ibm font-medium text-foreground mt-0.5">{c.v}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="border border-border p-10">
            <p className="font-cormorant text-3xl font-light text-foreground mb-8">Бесплатный расчёт</p>
            <div className="space-y-5">
              {[
                { l: "Имя", t: "text", p: "Александр" },
                { l: "Телефон", t: "tel", p: "+7 (___) ___-__-__" },
              ].map(f => (
                <div key={f.l}>
                  <label className="label-caps text-muted-foreground mb-2 block">{f.l}</label>
                  <input type={f.t} placeholder={f.p}
                    className="w-full bg-transparent border-b border-border py-3 font-ibm font-light text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors" />
                </div>
              ))}
              <div>
                <label className="label-caps text-muted-foreground mb-2 block">Тип помещения</label>
                <select className="w-full bg-transparent border-b border-border py-3 font-ibm font-light text-foreground focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option value="">Выберите тип</option>
                  <option>Квартира</option>
                  <option>Офис</option>
                  <option>Коммерческое помещение</option>
                  <option>Частный дом</option>
                </select>
              </div>
              <div>
                <label className="label-caps text-muted-foreground mb-2 block">Комментарий</label>
                <textarea rows={3} placeholder="Опишите объект и пожелания..."
                  className="w-full bg-transparent border-b border-border py-3 font-ibm font-light text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors resize-none" />
              </div>
              <div className="pt-4">
                <button className="w-full btn-red py-4 label-caps text-white flex items-center justify-center gap-3">
                  <span>Отправить заявку</span>
                  <Icon name="ArrowRight" size={13} />
                </button>
                <p className="label-caps text-muted-foreground text-center mt-4">
                  Нажимая кнопку, вы принимаете политику конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-7 h-7 bg-primary flex items-center justify-center">
                  <span className="font-ibm font-semibold text-white text-xs">М</span>
                </div>
                <span className="label-caps text-foreground tracking-[0.18em]">Мастер</span>
              </div>
              <p className="font-ibm font-light text-muted-foreground text-sm leading-relaxed">
                Профессиональный ремонт под ключ. 12 лет, 800+ проектов.
              </p>
            </div>
            <div>
              <p className="label-caps text-foreground mb-5">Услуги</p>
              <ul className="space-y-3">
                {["Ремонт квартир", "Офисный ремонт", "Ванные комнаты", "Дизайн интерьера"].map(s => (
                  <li key={s}><a href="#" className="font-ibm font-light text-muted-foreground text-sm hover:text-primary transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-caps text-foreground mb-5">Компания</p>
              <ul className="space-y-3">
                {NAV.map(l => (
                  <li key={l.href}><a href={l.href} className="font-ibm font-light text-muted-foreground text-sm hover:text-primary transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="label-caps text-foreground mb-5">Контакты</p>
              <div className="space-y-3">
                {[
                  { icon: "Phone",  t: "+7 (999) 123-45-67" },
                  { icon: "Mail",   t: "info@master-remont.ru" },
                  { icon: "MapPin", t: "Москва, ул. Строителей, 15" },
                ].map(c => (
                  <p key={c.t} className="font-ibm font-light text-muted-foreground text-sm flex items-center gap-2">
                    <Icon name={c.icon} size={13} className="text-primary shrink-0" /> {c.t}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-border mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="label-caps text-muted-foreground">© 2026 Мастер. Все права защищены.</p>
            <div className="flex gap-8">
              <a href="#" className="label-caps text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="label-caps text-muted-foreground hover:text-primary transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
