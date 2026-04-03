import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/245f39e3-e300-46e4-ac41-b9b2c7489ad6/files/8d63030c-d47f-4677-93ca-1af04033c864.jpg";
const OUTDOOR_IMG = "https://cdn.poehali.dev/projects/245f39e3-e300-46e4-ac41-b9b2c7489ad6/files/13d91f22-49b1-42d6-aeb6-e1214b88216b.jpg";
const MOM_IMG = "https://cdn.poehali.dev/projects/245f39e3-e300-46e4-ac41-b9b2c7489ad6/files/ba681532-695b-4168-8d11-2c1c444cbae4.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const features = [
  { icon: "Sun", title: "Уютная атмосфера", text: "Небольшие группы по 8–10 детей. Каждый ребёнок — в центре внимания." },
  { icon: "BookOpen", title: "Развивающие занятия", text: "Монтессори-материалы, творчество, музыка и ранняя подготовка к школе." },
  { icon: "Shield", title: "Безопасность", text: "Видеонаблюдение, закрытая территория, охрана. Родители спокойны." },
  { icon: "Leaf", title: "Правильное питание", text: "Домашняя кухня, пятиразовое питание без консервантов и красителей." },
  { icon: "Heart", title: "Любящие педагоги", text: "Опытные воспитатели с психологическим образованием и любовью к детям." },
  { icon: "Clock", title: "Гибкий режим", text: "Работаем с 7:30 до 20:00. Есть группы полного и неполного дня." },
];

const schedule = [
  { time: "7:30–8:30", label: "Приём детей", emoji: "🌅" },
  { time: "8:30–9:00", label: "Зарядка и завтрак", emoji: "🥣" },
  { time: "9:00–11:00", label: "Развивающие занятия", emoji: "🎨" },
  { time: "11:00–12:00", label: "Прогулка", emoji: "🌳" },
  { time: "12:00–13:00", label: "Обед", emoji: "🍲" },
  { time: "13:00–15:30", label: "Тихий час", emoji: "😴" },
  { time: "15:30–16:00", label: "Полдник", emoji: "🍓" },
  { time: "16:00–18:00", label: "Игры и творчество", emoji: "🧩" },
  { time: "18:00–20:00", label: "Вечерняя прогулка и уход", emoji: "🌙" },
];

const reviews = [
  {
    name: "Анна М.",
    child: "мама Саши, 4 года",
    text: "Очень боялась отдавать сына в сад, но здесь всё иначе. Каждое утро он бежит туда сам! Воспитатели просто золото.",
    avatar: "👩‍👦",
    video: true,
    duration: "1:24",
  },
  {
    name: "Дмитрий и Ольга",
    child: "родители Маши, 3 года",
    text: "Дочка расцвела буквально за месяц. Стала говорить, рисовать, петь. Рекомендуем всем знакомым!",
    avatar: "👨‍👩‍👧",
    video: true,
    duration: "2:08",
  },
  {
    name: "Елена К.",
    child: "мама Тимура, 5 лет",
    text: "Ходим уже два года. Готовят к школе на высшем уровне. Ребёнок знает буквы, счёт, рисует и занимается логикой.",
    avatar: "👩‍👶",
    video: true,
    duration: "1:47",
  },
];

const faqs = [
  { q: "С какого возраста принимаете детей?", a: "Принимаем малышей с 1 года 6 месяцев. Есть ясельная и дошкольная группы." },
  { q: "Сколько стоит посещение?", a: "Стоимость зависит от выбранной группы и режима. Уточните по телефону — подберём подходящий вариант." },
  { q: "Как проходит адаптация?", a: "Первые дни мама может присутствовать рядом. Адаптируем постепенно — по 2–3 часа с увеличением." },
  { q: "Есть ли место в группе прямо сейчас?", a: "Места заканчиваются быстро. Запишитесь на экскурсию — уточним актуальный список." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${open ? "border-[#F4A97F] bg-[#FFF8F4]" : "border-[#F0E8E0] bg-white hover:border-[#F4A97F]"}`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5 gap-4">
        <span className="font-nunito font-700 text-[#3D2C20] text-base">{q}</span>
        <span className={`transition-transform duration-300 text-[#F4A97F] flex-shrink-0 ${open ? "rotate-45" : ""}`}>
          <Icon name="Plus" size={20} />
        </span>
      </div>
      {open && (
        <div className="px-5 pb-5 font-nunito text-[#7A6458] text-sm leading-relaxed animate-fade-in">
          {a}
        </div>
      )}
    </div>
  );
}

function VideoReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div
      className="rounded-3xl bg-white border border-[#F0E8E0] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="relative aspect-video bg-gradient-to-br from-[#FFE8D6] to-[#F4C8A4] flex items-center justify-center">
        {!playing ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl opacity-20">{review.avatar}</span>
            </div>
            <button
              onClick={() => setPlaying(true)}
              className="relative z-10 w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
            >
              <Icon name="Play" size={24} className="text-[#F4A97F] ml-1" />
            </button>
            <span className="absolute bottom-3 right-4 text-xs font-nunito font-600 text-[#3D2C20]/70 bg-white/80 px-2 py-0.5 rounded-full">
              {review.duration}
            </span>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#3D2C20]/80">
            <span className="text-white font-nunito text-sm">Видеоотзыв родителей</span>
            <span className="text-white/60 font-nunito text-xs mt-1">(подключите настоящее видео)</span>
            <button onClick={() => setPlaying(false)} className="mt-3 text-white/80 text-xs underline">← Назад</button>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="font-nunito text-[#3D2C20] text-sm leading-relaxed mb-4">«{review.text}»</p>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{review.avatar}</span>
          <div>
            <div className="font-nunito font-700 text-[#3D2C20] text-sm">{review.name}</div>
            <div className="font-nunito text-[#B09080] text-xs">{review.child}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const featuresSection = useInView();
  const scheduleSection = useInView();
  const reviewsSection = useInView();
  const faqSection = useInView();
  const [formData, setFormData] = useState({ name: "", phone: "", age: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="font-nunito bg-[#FFFAF7] text-[#3D2C20] min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFAF7]/90 backdrop-blur-md border-b border-[#F0E8E0]">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">☀️</span>
            <span className="font-nunito font-800 text-[#3D2C20] text-lg">Солнышко</span>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-600 text-[#7A6458]">
            <a href="#about" className="hover:text-[#F4A97F] transition-colors">О нас</a>
            <a href="#program" className="hover:text-[#F4A97F] transition-colors">Программа</a>
            <a href="#reviews" className="hover:text-[#F4A97F] transition-colors">Отзывы</a>
            <a href="#contact" className="hover:text-[#F4A97F] transition-colors">Контакты</a>
          </div>
          <a href="#contact" className="bg-[#F4A97F] text-white font-nunito font-700 text-sm px-5 py-2.5 rounded-full hover:bg-[#E8956A] transition-colors">
            Записаться
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[55%] h-full">
            <img src={HERO_IMG} alt="Дети в саду" className="w-full h-full object-cover rounded-bl-[80px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FFFAF7] via-[#FFFAF7]/40 to-transparent rounded-bl-[80px]" />
          </div>
          <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-[#FFE4D0]/60 animate-float" />
          <div className="absolute top-32 left-[30%] w-16 h-16 rounded-full bg-[#D4EAD4]/60 animate-float" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-[#FFE8D6] text-[#C47840] text-sm font-600 px-4 py-2 rounded-full mb-6">
              <Icon name="MapPin" size={14} />
              Москва, ул. Садовая, 12
            </div>
            <h1 className="font-cormorant font-600 text-5xl md:text-6xl leading-tight text-[#3D2C20] mb-6">
              Место, где дети<br />
              <em className="text-[#F4A97F] not-italic">расцветают</em> каждый день
            </h1>
            <p className="text-[#7A6458] text-lg leading-relaxed mb-8 max-w-md">
              Частный детский сад для детей от 1,5 до 7 лет. Небольшие группы, любящие педагоги и атмосфера настоящего дома.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-[#F4A97F] text-white font-700 px-7 py-3.5 rounded-full hover:bg-[#E8956A] transition-all hover:scale-105 shadow-lg shadow-[#F4A97F]/30">
                Записаться на экскурсию
              </a>
              <a href="#about" className="border-2 border-[#F0E8E0] text-[#7A6458] font-600 px-7 py-3.5 rounded-full hover:border-[#F4A97F] hover:text-[#F4A97F] transition-colors">
                Узнать больше
              </a>
            </div>
            <div className="flex items-center gap-8 mt-10">
              {[["8+", "лет работы"], ["200+", "выпускников"], ["96%", "довольных семей"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-cormorant font-600 text-3xl text-[#F4A97F]">{n}</div>
                  <div className="text-xs text-[#B09080] font-500">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={featuresSection.ref} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className={`text-center mb-16 transition-all duration-700 ${featuresSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-600 text-[#F4A97F] uppercase tracking-widest">О формате</span>
            <h2 className="font-cormorant font-600 text-4xl md:text-5xl text-[#3D2C20] mt-3 mb-4">Почему выбирают нас</h2>
            <p className="text-[#7A6458] max-w-lg mx-auto">Мы создали пространство, в котором каждый ребёнок чувствует себя любимым и важным</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`bg-[#FFFAF7] rounded-3xl p-7 border border-[#F0E8E0] hover:border-[#F4A97F] hover:shadow-lg hover:shadow-[#F4A97F]/10 transition-all duration-500 group ${featuresSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFE8D6] flex items-center justify-center mb-4 group-hover:bg-[#F4A97F] transition-colors">
                  <Icon name={f.icon as any} size={22} className="text-[#F4A97F] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-700 text-[#3D2C20] text-lg mb-2">{f.title}</h3>
                <p className="text-[#7A6458] text-sm leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM / SCHEDULE */}
      <section id="program" ref={scheduleSection.ref} className="py-24 bg-[#FFFAF7]">
        <div className="max-w-6xl mx-auto px-5">
          <div className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-700 ${scheduleSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <span className="text-sm font-600 text-[#F4A97F] uppercase tracking-widest">Программа</span>
              <h2 className="font-cormorant font-600 text-4xl md:text-5xl text-[#3D2C20] mt-3 mb-6">
                День, наполненный<br />смыслом
              </h2>
              <p className="text-[#7A6458] leading-relaxed mb-8">
                Каждый день в «Солнышко» — это баланс учёбы, игры, отдыха и творчества. Мы следуем мягкому режиму, который уважает природные ритмы ребёнка.
              </p>
              <img src={OUTDOOR_IMG} alt="Прогулка" className="rounded-3xl w-full object-cover h-56 shadow-md" />
            </div>
            <div className="space-y-2">
              {schedule.map((item, i) => (
                <div
                  key={item.time}
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 hover:bg-white hover:shadow-sm ${scheduleSection.inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <span className="text-2xl w-8 flex-shrink-0">{item.emoji}</span>
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <span className="text-[#3D2C20] font-600 text-sm">{item.label}</span>
                    <span className="text-[#B09080] text-xs font-500 whitespace-nowrap">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO REVIEWS */}
      <section id="reviews" ref={reviewsSection.ref} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className={`text-center mb-16 transition-all duration-700 ${reviewsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-600 text-[#F4A97F] uppercase tracking-widest">Отзывы</span>
            <h2 className="font-cormorant font-600 text-4xl md:text-5xl text-[#3D2C20] mt-3 mb-4">Родители говорят сами</h2>
            <p className="text-[#7A6458] max-w-md mx-auto">Лучшая оценка нашей работы — искренние слова семей, которым мы доверяем</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={r.name}
                className={`transition-all duration-700 ${reviewsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <VideoReviewCard review={r} index={i} />
              </div>
            ))}
          </div>

          <div className={`mt-16 bg-gradient-to-br from-[#FFE8D6] to-[#F4C8A4] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 transition-all duration-700 delay-500 ${reviewsSection.inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <img src={MOM_IMG} alt="Счастливая семья" className="w-40 h-40 rounded-2xl object-cover flex-shrink-0 shadow-md" />
            <div>
              <div className="font-cormorant font-600 text-3xl text-[#3D2C20] mb-3 italic">
                «Здесь мой ребёнок по-настоящему счастлив»
              </div>
              <p className="text-[#7A6458] leading-relaxed mb-4">Мы собрали команду педагогов, которые не просто работают с детьми — они их любят. Приходите и почувствуйте атмосферу сами.</p>
              <a href="#contact" className="inline-flex items-center gap-2 font-700 text-[#C47840] hover:gap-3 transition-all">
                Записаться на экскурсию <Icon name="ArrowRight" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqSection.ref} className="py-24 bg-[#FFFAF7]">
        <div className="max-w-3xl mx-auto px-5">
          <div className={`text-center mb-12 transition-all duration-700 ${faqSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-600 text-[#F4A97F] uppercase tracking-widest">Вопросы и ответы</span>
            <h2 className="font-cormorant font-600 text-4xl text-[#3D2C20] mt-3">Часто спрашивают</h2>
          </div>
          <div className={`space-y-3 transition-all duration-700 delay-200 ${faqSection.inView ? "opacity-100" : "opacity-0"}`}>
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="bg-gradient-to-br from-[#3D2C20] to-[#5C4033] rounded-3xl p-10 md:p-16 text-white">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-[#F4A97F] text-sm font-600 uppercase tracking-widest">Запись</span>
                <h2 className="font-cormorant font-600 text-4xl md:text-5xl mt-3 mb-5 leading-tight">
                  Приходите<br />познакомиться
                </h2>
                <p className="text-white/70 leading-relaxed mb-8">
                  Запишитесь на бесплатную экскурсию по саду. Вы увидите всё своими глазами и познакомитесь с педагогами.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: "Phone", text: "+7 (999) 123-45-67" },
                    { icon: "MapPin", text: "Москва, ул. Садовая, 12" },
                    { icon: "Clock", text: "Пн–Пт, 7:30–20:00" },
                  ].map((c) => (
                    <div key={c.text} className="flex items-center gap-3 text-white/80">
                      <Icon name={c.icon as any} size={16} className="text-[#F4A97F]" />
                      <span className="text-sm">{c.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!submitted ? (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="bg-white/10 backdrop-blur rounded-2xl p-7 space-y-4"
                >
                  <h3 className="font-700 text-lg mb-2">Оставьте заявку</h3>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Мария"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F4A97F] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Телефон</label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F4A97F] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Возраст ребёнка</label>
                    <select
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#F4A97F] transition-colors appearance-none"
                    >
                      <option value="" className="text-gray-800">Выберите возраст</option>
                      <option value="1.5-2" className="text-gray-800">1,5–2 года</option>
                      <option value="2-3" className="text-gray-800">2–3 года</option>
                      <option value="3-5" className="text-gray-800">3–5 лет</option>
                      <option value="5-7" className="text-gray-800">5–7 лет</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#F4A97F] text-white font-700 py-3.5 rounded-xl hover:bg-[#E8956A] transition-all hover:scale-[1.02] shadow-lg shadow-[#F4A97F]/30 mt-2"
                  >
                    Записаться на экскурсию
                  </button>
                  <p className="text-white/40 text-xs text-center">Перезвоним в течение часа</p>
                </form>
              ) : (
                <div className="bg-white/10 backdrop-blur rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-64">
                  <span className="text-5xl mb-4">☀️</span>
                  <h3 className="font-700 text-xl mb-2">Заявка принята!</h3>
                  <p className="text-white/70 text-sm">Мы свяжемся с вами в ближайшее время и согласуем удобное время для визита.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-[#F0E8E0] bg-[#FFFAF7]">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">☀️</span>
            <span className="font-700 text-[#3D2C20]">Солнышко</span>
            <span className="text-[#B09080] text-sm ml-2">© 2024</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#B09080]">
            <a href="#about" className="hover:text-[#F4A97F] transition-colors">О нас</a>
            <a href="#program" className="hover:text-[#F4A97F] transition-colors">Программа</a>
            <a href="#reviews" className="hover:text-[#F4A97F] transition-colors">Отзывы</a>
            <a href="#contact" className="hover:text-[#F4A97F] transition-colors">Контакты</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
