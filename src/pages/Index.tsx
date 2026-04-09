import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const PORTFOLIO = [
  {
    id: 1, tag: "apartment",
    title: "Пречистенка, 112 м²",
    type: "Квартира под ключ",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/53a6953a-f028-44f8-959e-7dac2a81bc90.jpg",
    price: "от 6 000 ₽/м²",
  },
  {
    id: 2, tag: "bathroom",
    title: "Ванная, 14 м²",
    type: "Санузел Premium",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/cd3c95b1-062c-43a6-8747-2d2b0773a0f3.jpg",
    price: "от 8 000 ₽/м²",
  },
  {
    id: 3, tag: "apartment",
    title: "Гостиная, 68 м²",
    type: "Частичный ремонт",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/f2bd80bb-5323-4759-83b0-deaac64d15fc.jpg",
    price: "от 5 000 ₽/м²",
  },
  {
    id: 4, tag: "kitchen",
    title: "Кухня-лофт, 22 м²",
    type: "Кухня",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/7ff66fa8-acfe-4369-a7d0-2fcd9c6a7d95.jpg",
    price: "от 7 000 ₽/м²",
  },
  {
    id: 5, tag: "office",
    title: "Офис, 320 м²",
    type: "Коммерческий объект",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/ef3caff6-630d-4ddc-8de6-42f1ba500036.jpg",
    price: "от 4 500 ₽/м²",
  },
  {
    id: 6, tag: "apartment",
    title: "Невский, 87 м²",
    type: "Квартира под ключ",
    img: "https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/24eeb47a-0d46-4c11-9ecd-51cbb4cb6a17.jpg",
    price: "от 6 000 ₽/м²",
  },
];

const TARIFFS = [
  {
    name: "Базовый",
    price: "3 500",
    desc: "Для тех, кто хочет обновить квартиру аккуратно и по бюджету.",
    features: ["Шпаклёвка и покраска стен", "Укладка напольных покрытий", "Монтаж потолков", "Установка дверей", "Гарантия 1 год"],
    popular: false,
  },
  {
    name: "Стандарт",
    price: "6 000",
    desc: "Самый популярный пакет — полный ремонт с дизайн-проектом в подарок.",
    features: ["Всё из пакета «Базовый»", "Дизайн-проект в подарок", "Сантехника и электрика", "Плиточные работы", "Гарантия 2 года"],
    popular: true,
  },
  {
    name: "Премиум",
    price: "12 000",
    desc: "Авторский интерьер под ключ с закупкой материалов и управлением проектом.",
    features: ["Всё из пакета «Стандарт»", "Авторский дизайн-проект", "Закупка материалов", "Умный дом (базовый)", "Гарантия 3 года"],
    popular: false,
  },
];

const STEPS = [
  { n: "01", title: "Заявка и замер", desc: "Оставляете заявку — приезжаем на бесплатный замер в удобное время." },
  { n: "02", title: "Смета и договор", desc: "Готовим фиксированную смету. Подписываем договор — без скрытых доплат." },
  { n: "03", title: "Дизайн-проект", desc: "Разрабатываем планировку и дизайн. Согласовываем с вами каждый элемент." },
  { n: "04", title: "Ремонтные работы", desc: "Команда работает по графику. Вы следите за прогрессом онлайн." },
  { n: "05", title: "Сдача и гарантия", desc: "Принимаете объект, подписываете акт. Гарантия от 1 до 3 лет." },
];

const REVIEWS = [
  { name: "Анастасия В.", role: "Квартира, Пресня", text: "Ремонт сдали на 3 дня раньше срока! Качество отделки — безупречное. Вся команда внимательная и профессиональная.", stars: 5 },
  { name: "Дмитрий К.", role: "Офис, Садовое кольцо", text: "Сделали ремонт офиса 320 м² за 60 дней. Стоимость не выросла ни на рубль относительно сметы. Рекомендую.", stars: 5 },
  { name: "Марина С.", role: "Квартира, Красная Пресня", text: "Работаем с ними третий год как подрядчиками. Воплощают самые сложные авторские решения — не искажают замысел.", stars: 5 },
  { name: "Алексей П.", role: "4 объекта сданы", text: "Прозрачная смета, никаких сюрпризов. Все четыре объекта — в срок и в бюджете. Продолжаем сотрудничество.", stars: 5 },
];

const FAQS = [
  { q: "Сколько стоит ремонт квартиры под ключ?", a: "Стоимость зависит от площади, выбранного пакета и сложности работ. Базовый ремонт — от 3 500 ₽/м², стандарт — от 6 000 ₽/м², премиум — от 12 000 ₽/м²." },
  { q: "Как долго занимает ремонт?", a: "Стандартная квартира 50–80 м² в пакете «Стандарт» занимает 45–60 дней. Сроки фиксируем в договоре и несём за них ответственность." },
  { q: "Можно ли изменить проект в процессе ремонта?", a: "Да, но изменения фиксируются дополнительным соглашением со сметой. Это позволяет вам контролировать любые корректировки бюджета." },
  { q: "Какая гарантия на выполненные работы?", a: "От 1 года (Базовый) до 3 лет (Премиум). Гарантия распространяется на все виды выполненных работ и материалов." },
  { q: "Вы работаете с материалами заказчика?", a: "Да. Можете предоставить свои материалы или доверить закупку нам — предложим лучшие варианты по оптовым ценам." },
];

const NAV_LINKS = [
  { href: "#portfolio", label: "Работы" },
  { href: "#tariffs",   label: "Тарифы" },
  { href: "#process",   label: "Процесс" },
  { href: "#reviews",   label: "Отзывы" },
  { href: "#faq",       label: "FAQ" },
  { href: "#contacts",  label: "Контакты" },
];

/* ══════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════ */
export default function Index() {
  const [filter, setFilter] = useState("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const FILTERS = [
    { key: "all", label: "Все" },
    { key: "apartment", label: "Квартиры" },
    { key: "kitchen", label: "Кухни" },
    { key: "bathroom", label: "Ванные" },
    { key: "office", label: "Офисы" },
  ];
  const filtered = filter === "all" ? PORTFOLIO : PORTFOLIO.filter(p => p.tag === filter);

  return (
    <div className="min-h-screen bg-white text-foreground font-montserrat overflow-x-hidden">

      {/* ╔═══════════════════════════════════════╗
          ║              NAVBAR                   ║
          ╚═══════════════════════════════════════╝ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/96 backdrop-blur-sm shadow-[0_1px_0_0_hsl(var(--border))]" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary flex items-center justify-center">
              <span className="font-montserrat font-black text-white text-sm leading-none">М</span>
            </div>
            <span className="font-montserrat font-black text-lg tracking-tight text-foreground">МАСТЕР</span>
          </a>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href}
                className="navlink caps text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a href="tel:+79991234567" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
              <Icon name="Phone" size={15} />
              +7 (999) 123-45-67
            </a>
            <a href="#contacts" className="btn-primary px-5 py-2.5 caps text-white text-xs rounded-sm">
              Заказать звонок
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2">
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-border px-6 py-5 flex flex-col gap-4">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                className="caps text-muted-foreground hover:text-primary py-1">{l.label}</a>
            ))}
            <a href="#contacts" className="btn-primary px-6 py-3 caps text-white text-xs text-center mt-2 rounded-sm">
              Заказать звонок
            </a>
          </div>
        )}
      </nav>

      {/* ╔═══════════════════════════════════════╗
          ║              HERO                     ║
          ╚═══════════════════════════════════════╝ */}
      <section className="relative min-h-screen bg-[#111] overflow-hidden flex flex-col justify-end">
        {/* BG image */}
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/b34afd52-2476-4a98-81d0-faeca22a9cc8/files/53a6953a-f028-44f8-959e-7dac2a81bc90.jpg"
            alt="Интерьер"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 pt-32 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6 au d1">
              <div className="w-8 h-0.5 bg-primary" />
              <span className="caps text-primary">Ремонт под ключ в Москве</span>
            </div>

            <h1 className="heading text-[clamp(3rem,8vw,6.5rem)] text-white mb-6 au d2">
              Ремонт,<br />
              <span className="text-primary">который</span><br />
              нравится.
            </h1>

            <p className="text-white/60 text-lg font-medium max-w-lg leading-relaxed mb-10 au d3">
              Квартиры, офисы, коммерческие помещения. Фиксированная смета без доплат. Гарантия до 3 лет.
            </p>

            <div className="flex flex-wrap gap-4 mb-16 au d4">
              <a href="#contacts" className="btn-primary inline-flex items-center gap-3 px-8 py-4 caps text-white rounded-sm text-xs">
                Получить расчёт
                <Icon name="ArrowRight" size={14} />
              </a>
              <a href="#portfolio" className="btn-ghost inline-flex items-center gap-3 px-8 py-4 caps rounded-sm text-xs bg-transparent">
                <span>Смотреть работы</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-x-12 gap-y-6 pt-8 border-t border-white/10 au d5">
              {[
                { v: "800+", l: "завершённых проектов" },
                { v: "12", l: "лет на рынке" },
                { v: "98%", l: "клиентов рекомендуют" },
                { v: "3 года", l: "максимальная гарантия" },
              ].map(s => (
                <div key={s.l}>
                  <div className="heading text-4xl text-primary">{s.v}</div>
                  <div className="caps text-white/40 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════╗
          ║              TICKER                   ║
          ╚═══════════════════════════════════════╝ */}
      <div className="bg-primary py-3.5 ticker-wrap">
        <div className="ticker-inner">
          {Array(8).fill([
            "РЕМОНТ ПОД КЛЮЧ", "ДИЗАЙН-ПРОЕКТ", "СДАЧА В СРОК", "ГАРАНТИЯ 3 ГОДА", "800+ ОБЪЕКТОВ", "БЕСПЛАТНЫЙ ЗАМЕР"
          ]).flat().map((t, i) => (
            <span key={i} className="caps text-white/90 px-8 shrink-0">— {t}</span>
          ))}
        </div>
      </div>

      {/* ╔═══════════════════════════════════════╗
          ║           PORTFOLIO (hscroll)         ║
          ╚═══════════════════════════════════════╝ */}
      <section id="portfolio" className="py-20">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="caps text-primary mb-2">Наши работы</p>
              <h2 className="heading text-[clamp(2rem,4vw,3.5rem)]">Избранные проекты</h2>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  className={`px-4 py-2 caps text-xs rounded-sm transition-all ${
                    filter === f.key
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}>{f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal scroll row */}
        <div ref={scrollRef} className="hscroll px-6 max-w-7xl mx-auto">
          {filtered.map(p => (
            <div key={p.id}
              className="group relative shrink-0 w-[320px] sm:w-[380px] rounded-sm overflow-hidden cursor-pointer card-rise bg-white border border-border">
              <div className="zoom-wrap aspect-[4/3]">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover" />
              </div>
              {/* Overlay */}
              <div className="port-ov absolute inset-0 bg-foreground/80 flex flex-col justify-end p-6">
                <p className="caps text-primary mb-1">{p.type}</p>
                <h3 className="font-montserrat font-bold text-white text-xl leading-tight">{p.title}</h3>
                <p className="caps text-white/50 mt-2">{p.price}</p>
              </div>
              <div className="p-5">
                <h3 className="font-montserrat font-semibold text-foreground">{p.title}</h3>
                <p className="caps text-muted-foreground mt-1">{p.type}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="max-w-7xl mx-auto px-6 mt-5 flex items-center gap-2 text-muted-foreground">
          <Icon name="MoveRight" size={16} />
          <span className="caps text-xs">Прокрутите вправо</span>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════╗
          ║              WHY US                   ║
          ╚═══════════════════════════════════════╝ */}
      <section className="py-20 dark-section">
        <div className="max-w-7xl mx-auto px-6">
          <p className="caps text-primary mb-3">Почему мы</p>
          <h2 className="heading text-[clamp(2rem,4vw,3.5rem)] text-white mb-14">Наши преимущества</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10">
            {[
              { icon: "FileCheck", title: "Фиксированная смета", desc: "Цена прописана в договоре. Никаких доплат «по факту»." },
              { icon: "Shield",    title: "Гарантия до 3 лет",   desc: "Документальная гарантия на все виды выполненных работ." },
              { icon: "Clock",     title: "Сдача в срок",        desc: "За нарушение сроков — штраф в вашу пользу, это в договоре." },
              { icon: "Award",     title: "Опыт 12 лет",         desc: "Более 800 реализованных объектов в Москве и области." },
            ].map(f => (
              <div key={f.title} className="bg-[#111] p-8 group hover:bg-primary/10 transition-colors">
                <div className="w-12 h-12 bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors">
                  <Icon name={f.icon} size={22} className="text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-montserrat font-bold text-white text-base mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════╗
          ║              TARIFFS                  ║
          ╚═══════════════════════════════════════╝ */}
      <section id="tariffs" className="py-20 bg-[#f7f7f7]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="caps text-primary mb-3">Тарифы</p>
          <h2 className="heading text-[clamp(2rem,4vw,3.5rem)] mb-3">Цены без сюрпризов</h2>
          <p className="text-muted-foreground text-base font-medium mb-12 max-w-lg">
            Выберите пакет или обсудите индивидуальные условия — рассчитаем стоимость бесплатно.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {TARIFFS.map(t => (
              <div key={t.name}
                className={`relative flex flex-col rounded-sm overflow-hidden border transition-all ${
                  t.popular
                    ? "border-primary shadow-[0_0_0_2px_hsl(var(--primary))]"
                    : "border-border bg-white hover:border-foreground/20"
                }`}>
                {t.popular && (
                  <div className="bg-primary text-white caps text-xs py-2.5 text-center tracking-wider">
                    Популярный выбор
                  </div>
                )}
                <div className={`p-8 flex flex-col flex-1 ${t.popular ? "bg-white" : ""}`}>
                  <p className="caps text-muted-foreground mb-1">{t.name}</p>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="heading text-[2.8rem] text-foreground">{t.price}</span>
                    <span className="caps text-muted-foreground">₽/м²</span>
                  </div>
                  <p className="text-muted-foreground text-sm font-medium leading-relaxed mb-7">{t.desc}</p>

                  <ul className="space-y-3 flex-1 mb-8">
                    {t.features.map(f => (
                      <li key={f} className="flex items-start gap-3 text-sm font-medium">
                        <div className="w-4 h-4 bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon name="Check" size={11} className="text-primary" />
                        </div>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <button className={`w-full py-3.5 caps text-xs font-semibold rounded-sm transition-all ${
                    t.popular
                      ? "btn-primary text-white"
                      : "border border-foreground text-foreground hover:bg-foreground hover:text-white"
                  }`}>Выбрать пакет</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════╗
          ║              PROCESS                  ║
          ╚═══════════════════════════════════════╝ */}
      <section id="process" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="caps text-primary mb-3">Как мы работаем</p>
          <h2 className="heading text-[clamp(2rem,4vw,3.5rem)] mb-14">5 шагов<br />к результату</h2>

          <div className="grid md:grid-cols-5 gap-0 relative">
            {/* connector line desktop */}
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-px bg-border z-0" />

            {STEPS.map((s, i) => (
              <div key={s.n} className="relative z-10 flex flex-col items-center text-center px-4 mb-10 md:mb-0">
                <div className="w-16 h-16 bg-white border-2 border-primary rounded-sm flex items-center justify-center mb-5 heading text-2xl text-primary">
                  {s.n}
                </div>
                <h3 className="font-montserrat font-bold text-base mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <a href="#contacts" className="btn-primary inline-flex items-center gap-3 px-10 py-4 caps text-white rounded-sm">
              Начать проект
              <Icon name="ArrowRight" size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════╗
          ║              REVIEWS                  ║
          ╚═══════════════════════════════════════╝ */}
      <section id="reviews" className="py-20 dark-section">
        <div className="max-w-7xl mx-auto px-6">
          <p className="caps text-primary mb-3">Отзывы</p>
          <h2 className="heading text-[clamp(2rem,4vw,3.5rem)] text-white mb-12">Говорят клиенты</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 hover:border-primary/30 transition-colors card-rise">
                <div className="flex gap-1 mb-4">
                  {Array(r.stars).fill(0).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-primary" />
                  ))}
                </div>
                <p className="text-white/80 font-medium leading-relaxed mb-6 text-[15px]">"{r.text}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                  <div className="w-9 h-9 bg-primary flex items-center justify-center shrink-0">
                    <span className="font-montserrat font-black text-white text-xs">{r.name.slice(0,2)}</span>
                  </div>
                  <div>
                    <p className="font-montserrat font-bold text-white text-sm">{r.name}</p>
                    <p className="caps text-white/40">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════╗
          ║              FAQ                      ║
          ╚═══════════════════════════════════════╝ */}
      <section id="faq" className="py-20 bg-[#f7f7f7]">
        <div className="max-w-4xl mx-auto px-6">
          <p className="caps text-primary mb-3">FAQ</p>
          <h2 className="heading text-[clamp(2rem,4vw,3.5rem)] mb-12">Частые вопросы</h2>

          <div className="space-y-2">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white border border-border overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-7 py-5 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-montserrat font-semibold text-base text-foreground group-hover:text-primary transition-colors pr-6">{f.q}</span>
                  <div className={`shrink-0 w-7 h-7 bg-muted flex items-center justify-center transition-all duration-300 ${openFaq === i ? "bg-primary rotate-45" : ""}`}>
                    <Icon name="Plus" size={14} className={openFaq === i ? "text-white" : "text-foreground"} />
                  </div>
                </button>
                <div className={`faq-body ${openFaq === i ? "open" : ""}`}>
                  <p className="px-7 pb-6 text-muted-foreground font-medium text-sm leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════╗
          ║           CTA BANNER                  ║
          ╚═══════════════════════════════════════╝ */}
      <section className="relative py-24 overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
          backgroundSize: "20px 20px"
        }} />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="heading text-[clamp(2.5rem,5vw,4rem)] text-white mb-4">
            Готовы начать?
          </h2>
          <p className="text-white/80 font-medium text-lg mb-10 max-w-xl mx-auto">
            Оставьте заявку — перезвоним в течение 15 минут и запишем на бесплатный замер.
          </p>
          <a href="#contacts"
            className="inline-flex items-center gap-3 bg-white text-primary font-montserrat font-black px-10 py-4 caps rounded-sm hover:bg-white/90 transition-colors">
            Получить бесплатный расчёт
            <Icon name="ArrowRight" size={15} />
          </a>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════╗
          ║              CONTACTS                 ║
          ╚═══════════════════════════════════════╝ */}
      <section id="contacts" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <p className="caps text-primary mb-3">Контакты</p>
              <h2 className="heading text-[clamp(2rem,4vw,3.5rem)] mb-8">Свяжитесь с нами</h2>
              <p className="text-muted-foreground font-medium mb-10 leading-relaxed max-w-sm">
                Бесплатный выезд мастера на замер. Ответим на все вопросы и подготовим точную смету.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { icon: "Phone",  l: "Телефон",     v: "+7 (999) 123-45-67" },
                  { icon: "Mail",   l: "Email",        v: "info@master-remont.ru" },
                  { icon: "MapPin", l: "Адрес",        v: "Москва, ул. Строителей, 15" },
                  { icon: "Clock",  l: "Режим работы", v: "Ежедневно 8:00–20:00" },
                ].map(c => (
                  <div key={c.l} className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name={c.icon} size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="caps text-muted-foreground">{c.l}</p>
                      <p className="font-montserrat font-semibold text-foreground">{c.v}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-3">
                {[
                  { icon: "MessageCircle", label: "Telegram" },
                  { icon: "Phone", label: "WhatsApp" },
                  { icon: "Instagram", label: "Instagram" },
                ].map(s => (
                  <a key={s.label} href="#"
                    className="w-11 h-11 bg-muted flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-muted-foreground">
                    <Icon name={s.icon} size={17} />
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-[#f7f7f7] p-10 border border-border">
              <h3 className="font-montserrat font-black text-xl mb-7">Бесплатный расчёт стоимости</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="caps text-muted-foreground mb-1.5 block">Имя</label>
                    <input type="text" placeholder="Александр"
                      className="w-full bg-white border border-border px-4 py-3 font-montserrat font-medium text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors rounded-sm" />
                  </div>
                  <div>
                    <label className="caps text-muted-foreground mb-1.5 block">Телефон</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__"
                      className="w-full bg-white border border-border px-4 py-3 font-montserrat font-medium text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors rounded-sm" />
                  </div>
                </div>
                <div>
                  <label className="caps text-muted-foreground mb-1.5 block">Тип ремонта</label>
                  <select className="w-full bg-white border border-border px-4 py-3 font-montserrat font-medium text-sm text-foreground focus:outline-none focus:border-primary transition-colors rounded-sm appearance-none">
                    <option value="">Выберите тип</option>
                    <option>Квартира — под ключ</option>
                    <option>Квартира — частичный</option>
                    <option>Офис</option>
                    <option>Коммерческое помещение</option>
                  </select>
                </div>
                <div>
                  <label className="caps text-muted-foreground mb-1.5 block">Площадь, м²</label>
                  <input type="text" placeholder="Например, 65 м²"
                    className="w-full bg-white border border-border px-4 py-3 font-montserrat font-medium text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors rounded-sm" />
                </div>
                <div>
                  <label className="caps text-muted-foreground mb-1.5 block">Комментарий</label>
                  <textarea rows={3} placeholder="Пожелания, сроки, особенности объекта..."
                    className="w-full bg-white border border-border px-4 py-3 font-montserrat font-medium text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-colors resize-none rounded-sm" />
                </div>
                <button className="w-full btn-primary py-4 caps text-white text-xs font-semibold flex items-center justify-center gap-3 rounded-sm">
                  Получить расчёт бесплатно
                  <Icon name="ArrowRight" size={14} />
                </button>
                <p className="caps text-muted-foreground text-center">
                  Нажимая кнопку, вы принимаете политику конфиденциальности
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ╔═══════════════════════════════════════╗
          ║              FOOTER                   ║
          ╚═══════════════════════════════════════╝ */}
      <footer className="bg-[#111] text-white py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 bg-primary flex items-center justify-center">
                  <span className="font-montserrat font-black text-white text-sm">М</span>
                </div>
                <span className="font-montserrat font-black text-lg tracking-tight">МАСТЕР</span>
              </div>
              <p className="text-white/50 text-sm font-medium leading-relaxed">
                Профессиональный ремонт под ключ с 2014 года. 800+ проектов.
              </p>
            </div>
            <div>
              <p className="caps text-white/40 mb-4">Услуги</p>
              <ul className="space-y-2.5">
                {["Ремонт квартир", "Офисный ремонт", "Ванные комнаты", "Дизайн интерьера"].map(s => (
                  <li key={s}><a href="#" className="text-white/60 text-sm font-medium hover:text-primary transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="caps text-white/40 mb-4">Компания</p>
              <ul className="space-y-2.5">
                {NAV_LINKS.map(l => (
                  <li key={l.href}><a href={l.href} className="text-white/60 text-sm font-medium hover:text-primary transition-colors">{l.label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="caps text-white/40 mb-4">Контакты</p>
              <div className="space-y-3">
                {[
                  { icon: "Phone",  t: "+7 (999) 123-45-67" },
                  { icon: "Mail",   t: "info@master-remont.ru" },
                  { icon: "MapPin", t: "Москва, ул. Строителей, 15" },
                ].map(c => (
                  <p key={c.t} className="flex items-center gap-2.5 text-white/60 text-sm font-medium">
                    <Icon name={c.icon} size={13} className="text-primary shrink-0" /> {c.t}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="h-px bg-white/10 mb-7" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="caps text-white/30">© 2026 Мастер. Все права защищены.</p>
            <div className="flex gap-8">
              <a href="#" className="caps text-white/30 hover:text-white/60 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="caps text-white/30 hover:text-white/60 transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
