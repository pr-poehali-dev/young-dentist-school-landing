import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/245f39e3-e300-46e4-ac41-b9b2c7489ad6/files/49b78c8e-531d-49d1-9b7b-6ddfc17643eb.jpg";
const LEARN_IMG = "https://cdn.poehali.dev/projects/245f39e3-e300-46e4-ac41-b9b2c7489ad6/files/0cf1f7c5-9c1e-4375-a704-48fcf2f0afbf.jpg";
const CERT_IMG = "https://cdn.poehali.dev/projects/245f39e3-e300-46e4-ac41-b9b2c7489ad6/files/8c2192f9-e29f-403c-8cf2-ece5e2bd2bba.jpg";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const program = [
  { step: "01", emoji: "🦷", title: "Знакомство с зубами", text: "Изучаем строение зуба на большой модели. Узнаём, почему молочные зубы важны." },
  { step: "02", emoji: "🔬", title: "Микробы под микроскопом", text: "Смотрим на налёт через настоящий детский микроскоп. Вот почему нужно чистить!" },
  { step: "03", emoji: "🩺", title: "Примерка инструментов", text: "Надеваем халат, перчатки, маску. Пробуем настоящие (безопасные) инструменты." },
  { step: "04", emoji: "🦷", title: "Практика чистки", text: "Чистим зубы манекену правильной техникой — 2 минуты по всем правилам." },
  { step: "05", emoji: "🎨", title: "Ставим пломбу", text: "Лепим пломбу из специального материала. Настоящая работа стоматолога!" },
  { step: "06", emoji: "🎓", title: "Диплом и подарок", text: "Вручаем диплом «Юного стоматолога» и набор для правильного ухода за зубами." },
];

const facts = [
  { num: "2,5", unit: "часа", label: "длительность мастер-класса" },
  { num: "5–12", unit: "лет", label: "возраст участников" },
  { num: "8", unit: "детей", label: "максимум в группе" },
  { num: "100%", unit: "", label: "безопасно и весело" },
];

const reviews = [
  {
    name: "Светлана О.",
    about: "мама Пети, 7 лет",
    text: "Сын пришёл домой и немедленно почистил зубы — сам! Без напоминаний. До этого было невозможно. Спасибо огромное!",
    emoji: "👩",
    video: true,
    duration: "1:32",
  },
  {
    name: "Артём и Ксения",
    about: "родители Даши, 9 лет",
    text: "Дочка теперь знает про зубы больше меня. Объясняет всем в семье, как правильно чистить. Потрясающий формат!",
    emoji: "👨‍👩‍👧",
    video: true,
    duration: "2:14",
  },
  {
    name: "Марина В.",
    about: "мама Коли, 6 лет",
    text: "Боялись, что будет страшно — всё наоборот. Коля теперь хочет стать стоматологом. Ходим уже второй раз!",
    emoji: "👩‍👦",
    video: true,
    duration: "1:55",
  },
];

const faqs = [
  { q: "Подходит ли детям, которые боятся стоматолога?", a: "Это один из главных эффектов! Когда ребёнок видит инструменты в игровой обстановке и сам их держит — страх уходит. 9 из 10 детей после мастер-класса спокойно ходят к врачу." },
  { q: "Какой возраст подходит?", a: "Принимаем детей от 5 до 12 лет. Для малышей 5–6 лет программа немного адаптируется." },
  { q: "Могут ли родители присутствовать?", a: "Да! Родители сидят рядом и могут снимать видео. Многие говорят, что сами узнали много нового." },
  { q: "Что нужно взять с собой?", a: "Ничего — всё включено. Халатики, перчатки, дипломы и подарочный набор. Просто приходите!" },
  { q: "Проводите ли корпоративы и дни рождения?", a: "Конечно! Можно арендовать мастер-класс для группы от 5 человек — день рождения, праздник, событие в школе." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${open ? "border-[#7CC8C0] bg-[#F4FFFE]" : "border-[#E0F0EE] bg-white hover:border-[#7CC8C0]"}`}
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between p-5 gap-4">
        <span className="font-nunito font-bold text-[#1A3A36] text-base">{q}</span>
        <span className={`transition-transform duration-300 text-[#7CC8C0] flex-shrink-0 ${open ? "rotate-45" : ""}`}>
          <Icon name="Plus" size={20} />
        </span>
      </div>
      {open && (
        <div className="px-5 pb-5 font-nunito text-[#4A7A74] text-sm leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

function VideoCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="rounded-3xl bg-white border border-[#E0F0EE] overflow-hidden shadow-sm hover:shadow-lg hover:shadow-[#7CC8C0]/15 transition-all duration-300">
      <div
        className="relative aspect-video flex items-center justify-center cursor-pointer"
        style={{ background: `linear-gradient(135deg, #D4F0EC ${index * 20}%, #B8E8E4)` }}
        onClick={() => setPlaying(!playing)}
      >
        {!playing ? (
          <>
            <span className="text-8xl opacity-20 absolute">{review.emoji}</span>
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                <Icon name="Play" size={26} className="text-[#3DADA3] ml-1" />
              </div>
              <span className="text-[#1A3A36]/60 text-xs font-semibold bg-white/80 px-3 py-1 rounded-full">видеоотзыв · {review.duration}</span>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1A3A36]/80">
            <span className="text-white font-nunito text-sm">Видеоотзыв родителей</span>
            <span className="text-white/50 text-xs mt-1">(подключите настоящее видео)</span>
            <button onClick={() => setPlaying(false)} className="mt-3 text-white/70 text-xs underline">← Назад</button>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="font-nunito text-[#1A3A36] text-sm leading-relaxed mb-4">«{review.text}»</p>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{review.emoji}</span>
          <div>
            <div className="font-nunito font-bold text-[#1A3A36] text-sm">{review.name}</div>
            <div className="text-[#7CC8C0] text-xs">{review.about}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const programSection = useInView();
  const reviewsSection = useInView();
  const faqSection = useInView();
  const factsSection = useInView();
  const [formData, setFormData] = useState({ name: "", phone: "", age: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="font-nunito bg-[#F7FFFE] text-[#1A3A36] min-h-screen overflow-x-hidden">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7FFFE]/95 backdrop-blur-md border-b border-[#E0F0EE]">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">🦷</span>
            <div>
              <div className="font-extrabold text-[#1A3A36] text-base leading-tight">Школа юного</div>
              <div className="font-extrabold text-[#3DADA3] text-base leading-tight">стоматолога</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-7 text-sm font-semibold text-[#4A7A74]">
            <a href="#program" className="hover:text-[#3DADA3] transition-colors">Программа</a>
            <a href="#reviews" className="hover:text-[#3DADA3] transition-colors">Отзывы</a>
            <a href="#faq" className="hover:text-[#3DADA3] transition-colors">Вопросы</a>
          </div>
          <a href="#contact" className="bg-[#3DADA3] text-white font-bold text-sm px-5 py-2.5 rounded-full hover:bg-[#2D9D93] transition-all hover:scale-105 shadow-lg shadow-[#3DADA3]/30">
            Записаться
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full bg-[#C8F0EC]/40" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#D4F5E0]/30" />
          <div className="absolute top-1/2 right-[5%] w-10 h-10 rounded-full bg-[#FFE8A0]/80 animate-[float_5s_ease-in-out_infinite]" />
          <div className="absolute top-1/3 left-[8%] w-7 h-7 rounded-full bg-[#FFCCD0]/80 animate-[float_7s_ease-in-out_infinite_1s]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div style={{ animation: "fadeInUp 0.9s ease-out forwards" }}>
            <div className="inline-flex items-center gap-2 bg-[#D4F5E8] text-[#2A8A80] text-sm font-bold px-4 py-2 rounded-full mb-6">
              <span>🎓</span>
              Для детей 5–12 лет · Москва
            </div>
            <h1 className="font-cormorant font-semibold text-5xl md:text-6xl leading-tight text-[#1A3A36] mb-6">
              Мастер-класс,<br />
              после которого<br />
              <em className="text-[#3DADA3] not-italic">зубы чистят сами</em>
            </h1>
            <p className="text-[#4A7A74] text-lg leading-relaxed mb-8 max-w-md">
              2,5 часа в роли настоящего стоматолога. Ребёнок примеряет халат, работает с инструментами и получает диплом. Страх перед врачом — уходит навсегда.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="bg-[#3DADA3] text-white font-extrabold px-7 py-4 rounded-full hover:bg-[#2D9D93] transition-all hover:scale-105 shadow-xl shadow-[#3DADA3]/30 text-base">
                Записаться на мастер-класс
              </a>
              <a href="#program" className="border-2 border-[#B8E8E4] text-[#4A7A74] font-semibold px-7 py-4 rounded-full hover:border-[#3DADA3] hover:text-[#3DADA3] transition-colors">
                Смотреть программу
              </a>
            </div>
            <div className="flex items-center gap-2 mt-6 text-sm text-[#4A7A74]">
              <Icon name="CalendarDays" size={15} className="text-[#3DADA3]" />
              <span>Ближайший: <strong className="text-[#1A3A36]">19 апреля, суббота, 11:00</strong></span>
            </div>
          </div>

          <div className="relative" style={{ animation: "fadeInUp 0.9s ease-out 0.2s both" }}>
            <div className="absolute -top-4 -right-4 w-full h-full rounded-3xl bg-[#B8E8E4]/50" />
            <img
              src={HERO_IMG}
              alt="Дети на мастер-классе"
              className="relative rounded-3xl w-full object-cover h-96 shadow-2xl shadow-[#3DADA3]/20"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-lg border border-[#E0F0EE]">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                <div>
                  <div className="font-extrabold text-[#1A3A36] text-sm">Сертификат</div>
                  <div className="text-[#7CC8C0] text-xs">Юный стоматолог</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={factsSection.ref} className="py-16 bg-[#1A3A36]">
        <div className="max-w-5xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {facts.map((f, i) => (
              <div
                key={f.label}
                className={`text-center transition-all duration-700 ${factsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="font-cormorant font-semibold text-4xl text-[#7CC8C0]">
                  {f.num}<span className="text-2xl text-[#3DADA3] ml-1">{f.unit}</span>
                </div>
                <div className="text-white/60 text-sm mt-1">{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section id="program" ref={programSection.ref} className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className={`text-center mb-16 transition-all duration-700 ${programSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-bold text-[#3DADA3] uppercase tracking-widest">Программа</span>
            <h2 className="font-cormorant font-semibold text-4xl md:text-5xl text-[#1A3A36] mt-3 mb-4">Что происходит на занятии</h2>
            <p className="text-[#4A7A74] max-w-lg mx-auto">6 шагов от «боюсь стоматолога» до «хочу им стать»</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {program.map((step, i) => (
              <div
                key={step.step}
                className={`flex gap-5 p-6 rounded-3xl bg-[#F7FFFE] border border-[#E0F0EE] hover:border-[#7CC8C0] hover:shadow-md transition-all duration-500 ${programSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-[#D4F5EC] flex items-center justify-center text-2xl">
                    {step.emoji}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-[#7CC8C0] mb-1">Шаг {step.step}</div>
                  <h3 className="font-bold text-[#1A3A36] text-base mb-1.5">{step.title}</h3>
                  <p className="text-[#4A7A74] text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-12 grid md:grid-cols-2 gap-8 items-center transition-all duration-700 delay-500 ${programSection.inView ? "opacity-100" : "opacity-0"}`}>
            <img src={LEARN_IMG} alt="Обучение" className="rounded-3xl object-cover w-full h-64 shadow-lg" />
            <img src={CERT_IMG} alt="Диплом" className="rounded-3xl object-cover w-full h-64 shadow-lg" />
          </div>
        </div>
      </section>

      {/* VIDEO REVIEWS */}
      <section id="reviews" ref={reviewsSection.ref} className="py-24 bg-[#F7FFFE]">
        <div className="max-w-6xl mx-auto px-5">
          <div className={`text-center mb-16 transition-all duration-700 ${reviewsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-bold text-[#3DADA3] uppercase tracking-widest">Отзывы</span>
            <h2 className="font-cormorant font-semibold text-4xl md:text-5xl text-[#1A3A36] mt-3 mb-4">Родители снимают сами</h2>
            <p className="text-[#4A7A74] max-w-md mx-auto">Смотрите настоящие видеоотзывы — без сценариев и купюр</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div
                key={r.name}
                className={`transition-all duration-700 ${reviewsSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                <VideoCard review={r} index={i} />
              </div>
            ))}
          </div>

          <div className={`mt-12 bg-gradient-to-r from-[#1A3A36] to-[#2D6E66] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 text-white transition-all duration-700 delay-500 ${reviewsSection.inView ? "opacity-100" : "opacity-0"}`}>
            <div className="text-7xl">🦷</div>
            <div>
              <div className="font-cormorant font-semibold text-3xl mb-2 italic">«Теперь чистит зубы без напоминаний»</div>
              <p className="text-white/70 text-sm leading-relaxed">Это говорят 87% родителей спустя месяц после мастер-класса. Знания, полученные через практику и эмоции, остаются с детьми навсегда.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={faqSection.ref} className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <div className={`text-center mb-12 transition-all duration-700 ${faqSection.inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="text-sm font-bold text-[#3DADA3] uppercase tracking-widest">Вопросы</span>
            <h2 className="font-cormorant font-semibold text-4xl text-[#1A3A36] mt-3">Часто спрашивают</h2>
          </div>
          <div className={`space-y-3 transition-all duration-700 delay-200 ${faqSection.inView ? "opacity-100" : "opacity-0"}`}>
            {faqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-[#F7FFFE]">
        <div className="max-w-5xl mx-auto px-5">
          <div className="bg-gradient-to-br from-[#1A3A36] to-[#2A5A54] rounded-3xl p-10 md:p-16 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
            <div className="relative grid md:grid-cols-2 gap-12 items-start">
              <div>
                <span className="text-[#7CC8C0] text-sm font-bold uppercase tracking-widest">Запись</span>
                <h2 className="font-cormorant font-semibold text-4xl md:text-5xl mt-3 mb-5 leading-tight">
                  Ближайший<br />мастер-класс
                </h2>
                <div className="bg-white/10 rounded-2xl p-5 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="CalendarDays" size={18} className="text-[#7CC8C0]" />
                    <span className="font-bold">19 апреля, суббота</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="Clock" size={18} className="text-[#7CC8C0]" />
                    <span>11:00 — 13:30</span>
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <Icon name="MapPin" size={18} className="text-[#7CC8C0]" />
                    <span>Москва, ул. Тверская, 8</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Users" size={18} className="text-[#7CC8C0]" />
                    <span>Осталось <strong className="text-[#7CC8C0]">3 места</strong> из 8</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <Icon name="Phone" size={15} className="text-[#7CC8C0]" />
                  <span>+7 (999) 123-45-67</span>
                </div>
              </div>

              {!submitted ? (
                <form
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  className="bg-white/10 backdrop-blur rounded-2xl p-7 space-y-4"
                >
                  <h3 className="font-bold text-xl mb-1">Забронировать место</h3>
                  <p className="text-white/60 text-sm mb-2">Бесплатно, без предоплаты</p>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Мария"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#7CC8C0] transition-colors"
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
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#7CC8C0] transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/60 text-xs mb-1.5 block">Возраст ребёнка</label>
                    <select
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#7CC8C0] transition-colors"
                    >
                      <option value="" className="text-gray-800">Выберите возраст</option>
                      <option value="5-6" className="text-gray-800">5–6 лет</option>
                      <option value="7-9" className="text-gray-800">7–9 лет</option>
                      <option value="10-12" className="text-gray-800">10–12 лет</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#3DADA3] text-white font-extrabold py-4 rounded-xl hover:bg-[#2D9D93] transition-all hover:scale-[1.02] shadow-lg shadow-[#3DADA3]/30 mt-2"
                  >
                    Забронировать место 🦷
                  </button>
                  <p className="text-white/40 text-xs text-center">Перезвоним в течение часа для подтверждения</p>
                </form>
              ) : (
                <div className="bg-white/10 backdrop-blur rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-64">
                  <span className="text-6xl mb-4">🎓</span>
                  <h3 className="font-bold text-xl mb-2">Место забронировано!</h3>
                  <p className="text-white/70 text-sm">Мы свяжемся с вами в ближайшее время и пришлём всю информацию о мастер-классе.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-[#E0F0EE] bg-white">
        <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦷</span>
            <span className="font-extrabold text-[#1A3A36]">Школа юного стоматолога</span>
            <span className="text-[#7CC8C0] text-sm ml-2">© 2024</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-[#7CC8C0]">
            <a href="#program" className="hover:text-[#3DADA3] transition-colors">Программа</a>
            <a href="#reviews" className="hover:text-[#3DADA3] transition-colors">Отзывы</a>
            <a href="#faq" className="hover:text-[#3DADA3] transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-[#3DADA3] transition-colors">Контакты</a>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
    </div>
  );
}
