/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { MapPin, Clock, Phone, Instagram, Coffee, CreditCard, Car, Menu as MenuIcon, X, ArrowUpRight, Mail, MessageCircle, ArrowRight, Languages, ChevronDown } from 'lucide-react';

const MENU_CATEGORIES = [
  { id: 'signature', en: 'Signature Drinks', ar: 'مشروباتنا الخاصة' },
  { id: 'breakfast', en: 'Breakfast', ar: 'الإفطار' },
  { id: 'food', en: 'Food', ar: 'الأطباق' },
  { id: 'desserts', en: 'Desserts', ar: 'الحلويات' },
  { id: 'matcha', en: 'Matcha & Tea', ar: 'الماتشا والشاي' }
];

const getMenuImage = (category: string, index: number) => {
  const images = {
    'Signature Drinks': [
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop",
    ],
    'Breakfast': [
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=800&auto=format&fit=crop",
    ],
    'Food': [
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop",
    ],
    'Desserts': [
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop",
    ],
    'Matcha & Tea': [
      "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?q=80&w=800&auto=format&fit=crop",
    ]
  };

  const categoryImages = images['Signature Drinks']; // Simplified for consistency
  return categoryImages[index % categoryImages.length];
};

const MENU_DATA = {
  'signature': [
    { en: 'Gela Latte', ar: 'جيلا لاتيه', price: '2.63' },
    { en: 'Creamy Espresso', ar: 'إسبريسو كريمي', price: '2.10' },
    { en: 'Ice Sheken', ar: 'آيس شيكن', price: '2.10' },
    { en: 'Spanish Latte Hot / Cold', ar: 'سبانش لاتيه حار / بارد', price: '2.31' },
    { en: 'Cold Brew', ar: 'كولد برو', price: '2.94' },
    { en: 'V60 Hot / Cold', ar: 'في 60 حار / بارد', price: '2.21 - 3.68' },
  ],
  'breakfast': [
    { en: 'Zatar Three Cheese', ar: 'زعتر بالأجبان الثلاثة', price: '2.625' },
    { en: 'Turkey Cheese', ar: 'ديك رومي بالجبن', price: '2.625' },
    { en: 'Avocado Focaccia', ar: 'فوكاشيا الأفوكادو', price: '2.625' },
    { en: 'Lahm Bi Ajeen', ar: 'لحم بعجين', price: '2.835' },
    { en: 'Turkish Eggs', ar: 'بيض تركي', price: '2.635' },
    { en: 'French Shakshuka', ar: 'شكشوكة فرنسية', price: '2.653' },
    { en: 'Our Home Shaksuka', ar: 'شكشوكة البيت', price: '2.835' },
    { en: 'Eggs Benedicts', ar: 'بيديكت البيض', price: '2.835' },
    { en: 'Balaleet Saffron', ar: 'بلاليط بالزعفران', price: '2.635' },
    { en: 'Acai Bowl', ar: 'فخار الآساي', price: '2.940' },
    { en: 'Granola Bowl', ar: 'فخار الجرانولا', price: '2.940' },
  ],
  'food': [
    { en: 'Penne Rosa', ar: 'بيني روزا', price: '3.150' },
    { en: 'Chicken Rigatoni', ar: 'ريغاتوني بالدجاج', price: '3.150' },
    { en: 'Fusilli Pesto', ar: 'فوسيلي بيستو', price: '3.150' },
    { en: 'Truffle Rigatone', ar: 'ريغاتوني الترفل', price: '3.150' },
    { en: 'Truffle Pizza', ar: 'بيتزا الترفل', price: '3.675' },
    { en: 'Pesto Pizza', ar: 'بيتزا البيستو', price: '3.675' },
    { en: 'Diavola Pizza', ar: 'بيتزا ديافولا', price: '3.675' },
    { en: 'Margherita Pizza', ar: 'بيتزا مارغريتا', price: '3.045' },
    { en: 'Karnoza (Beef) Pizza', ar: 'بيتزا كارنوزا (لحم)', price: '3.780' },
  ],
  'desserts': [
    { en: 'Banana Pudding', ar: 'بودينغ الموز', price: '3.36' },
    { en: 'Tiramisu', ar: 'تيراميسو', price: '3.10' },
    { en: 'San Sebastian', ar: 'سان سيباستيان', price: '3.10' },
    { en: 'Cheese Cake', ar: 'تشيز كيك', price: '3.10' },
    { en: 'Chocolate Cake', ar: 'كيكة الشوكولاتة', price: '3.10' },
  ],
  'matcha': [
    { en: 'Matcha Hot / Cold', ar: 'ماتشا حار / بارد', price: '2.63' },
    { en: 'Mango Matcha Cold', ar: 'مانجو ماتشا بارد', price: '2.94' },
    { en: 'Strawberry Matcha Cold', ar: 'فراولة ماتشا بارد', price: '2.94' },
    { en: 'Hibiscus Ice Tea', ar: 'شاي كركديه بارد', price: '2.63' },
    { en: 'Peach Ice Tea', ar: 'شاي خوخ بارد', price: '2.63' },
    { en: 'Seancha Green Tea', ar: 'شاي سينشا الأخضر', price: '2.63' },
  ]
};

const OurStory = ({ isRTL, lang }: { isRTL: boolean, lang: 'en' | 'ar' }) => {
  const t = {
    en: {
      hero: { title1: 'Every Story', title2: 'Starts with', highlight: 'a Dream.' },
      beginning: { label: 'The Beginning', title: 'A Space to', highlight: 'Breathe.', text: 'Gela was born from a simple yet profound vision: to create a space where the rich traditions of Omani hospitality meet the artistry of modern specialty coffee. It began with a single scoop of authentic gelato and a perfect pour of espresso.' },
      vision: { label: 'The Vision', title: 'Crafted with', highlight: 'Intention.', text: 'Our journey is defined by the pursuit of excellence. From the selection of the finest beans to our signature matcha blends, every detail is a testament to our dedication to the craft.' },
      sanctuary: { label: 'The Sanctuary', title: 'Your Daily', highlight: 'Escape.', text: 'We designed Gela to be more than a cafe. It is a sanctuary—a place to disconnect from the noise and reconnect with yourself and your community.' },
      soul: { label: 'The Soul', title: 'The Gela', highlight: 'Family.', text: 'You are the heartbeat of Gela. Our story is written by the laughter shared, the connections made, and the moments you\'ve spent within these walls.' },
      appreciation: { label: 'Guest Stories', title: 'Shared', highlight: 'Moments.', subtitle: 'A post of appreciation to our incredible community.' }
    },
    ar: {
      hero: { title1: 'كل قصة', title2: 'تبدأ بـ', highlight: 'حلم.' },
      beginning: { label: 'البداية', title: 'مساحة لـ', highlight: 'التنفس.', text: 'ولدت جيلا من رؤية بسيطة ولكنها عميقة: خلق مساحة حيث تلتقي التقاليد الغنية للضيافة العمانية مع فن القهوة المختصة الحديثة. بدأت بملعقة واحدة من الجيلاتو الأصلي وسكبة مثالية من الإسبريسو.' },
      vision: { label: 'الرؤية', title: 'صيغت بـ', highlight: 'إتقان.', text: 'تتميز رحلتنا بالسعي وراء التميز. من اختيار أجود الحبوب إلى خلطات الماتشا المميزة لدينا، كل تفصيل هو شهادة على تفانينا في الحرفة.' },
      sanctuary: { label: 'الملاذ', title: 'هروبك', highlight: 'اليومي.', text: 'لقد صممنا جيلا لتكون أكثر من مجرد مقهى. إنها ملاذ - مكان للانفصال عن الضجيج وإعادة الاتصال مع نفسك ومجتمعك.' },
      soul: { label: 'الروح', title: 'عائلة', highlight: 'جيلا.', text: 'أنتم نبض قلب جيلا. تُكتب قصتنا من خلال الضحكات المشتركة، والروابط التي تم بناؤها، واللحظات التي قضيتها داخل هذه الجدران.' },
      appreciation: { label: 'قصص الضيوف', title: 'لحظات', highlight: 'مشتركة.', subtitle: 'منشور تقدير لمجتمعنا الرائع.' }
    }
  }[lang];

  return (
    <div className="bg-[var(--color-gela-cream)] min-h-screen overflow-hidden">
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-110 blur-[2px] brightness-[0.7]"
        >
          <source src="/ourstory/story1 (7).mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a3626]/40 via-transparent to-[var(--color-gela-cream)]" />

        <div className="relative z-10 text-center px-6">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-[10px] uppercase tracking-[0.5em] text-white/70 font-bold mb-6 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}
          >
            EST. 2024
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className={`font-heading text-6xl md:text-8xl lg:text-9xl text-white leading-[0.8] tracking-tighter ${isRTL ? 'font-arabic leading-tight' : ''}`}
          >
            {t.hero.title1} <br />
            <span className="font-light italic opacity-50">{t.hero.title2}</span> <br />
            <span className="text-[var(--color-gela-green)]">{t.hero.highlight}</span>
          </motion.h1>
        </div>
      </section>

      {/* Chapter 1: The Beginning */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src="/ourstory/story1 (9).mp4" type="video/mp4" />
                </video>
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[var(--color-gela-green)]/10 rounded-full blur-3xl -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="max-w-xl"
            >
              <span className={`text-[10px] uppercase tracking-[0.4em] text-[var(--color-gela-green)] font-bold mb-6 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}>{t.beginning.label}</span>
              <h2 className={`font-heading text-5xl md:text-7xl text-[var(--color-gela-espresso)] leading-[0.9] tracking-tighter mb-8 ${isRTL ? 'font-arabic leading-tight' : ''}`}>
                {t.beginning.title} <br />
                <span className="italic font-light text-[var(--color-gela-green)]">{t.beginning.highlight}</span>
              </h2>
              <p className={`text-xl md:text-2xl font-light leading-relaxed text-[var(--color-gela-espresso)]/70 ${isRTL ? 'font-arabic' : ''}`}>
                {t.beginning.text}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chapter 2: The Vision - Multi Image Grid */}
      <section className="py-32 bg-[var(--color-gela-espresso)] text-[var(--color-gela-cream)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-12 mb-16 text-center">
              <span className={`text-[10px] uppercase tracking-[0.4em] text-[var(--color-gela-green)] font-bold mb-6 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}>{t.vision.label}</span>
              <h2 className={`font-heading text-5xl md:text-8xl leading-[0.8] tracking-tighter ${isRTL ? 'font-arabic leading-tight' : ''}`}>
                {t.vision.title} <br />
                <span className="italic font-light text-[var(--color-gela-green)]">{t.vision.highlight}</span>
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:col-span-5 aspect-[3/4] rounded-[40px] overflow-hidden"
            >
              <img src="/ourstory/1.jpg" alt="Process" className="w-full h-full object-cover" />
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="aspect-square rounded-[32px] overflow-hidden"
              >
                <img src="/ourstory/story1 (2).jpg" alt="Detail" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="aspect-square rounded-[32px] overflow-hidden"
              >
                <img src="/ourstory/story1 (3).jpg" alt="Aura" className="w-full h-full object-cover" />
              </motion.div>
              <div className="md:col-span-2">
                <p className={`text-2xl font-light leading-relaxed text-[var(--color-gela-cream)]/70 ${isRTL ? 'font-arabic' : ''}`}>
                  {t.vision.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 3: The Sanctuary - Full Width Video */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover brightness-[0.6]">
          <source src="/ourstory/story1 (3).mp4" type="video/mp4" />
        </video>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <span className={`text-[10px] uppercase tracking-[0.4em] text-[var(--color-gela-green)] font-bold mb-6 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}>{t.sanctuary.label}</span>
          <h2 className={`font-heading text-6xl md:text-9xl text-white leading-[0.8] tracking-tighter mb-8 ${isRTL ? 'font-arabic leading-tight' : ''}`}>
            {t.sanctuary.title} <br />
            <span className="italic font-light opacity-60">{t.sanctuary.highlight}</span>
          </h2>
          <p className={`text-xl md:text-3xl font-light text-white/80 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
            {t.sanctuary.text}
          </p>
        </div>
      </section>

      {/* Chapter 4: The Soul - Family/Community */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:order-2"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-[24px] overflow-hidden">
                    <img src="/ourstory/story1 (4).jpg" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-square rounded-[24px] overflow-hidden">
                    <img src="/ourstory/story1 (6).jpg" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="pt-12">
                  <div className="aspect-[3/4] rounded-[24px] overflow-hidden shadow-2xl">
                    <img src="/ourstory/story1 (5).jpg" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:order-1 max-w-xl"
            >
              <span className={`text-[10px] uppercase tracking-[0.4em] text-[var(--color-gela-green)] font-bold mb-6 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}>{t.soul.label}</span>
              <h2 className={`font-heading text-5xl md:text-7xl text-[var(--color-gela-espresso)] leading-[0.9] tracking-tighter mb-8 ${isRTL ? 'font-arabic leading-tight' : ''}`}>
                {t.soul.title} <br />
                <span className="italic font-light text-[var(--color-gela-green)]">{t.soul.highlight}</span>
              </h2>
              <p className={`text-xl md:text-2xl font-light leading-relaxed text-[var(--color-gela-espresso)]/70 ${isRTL ? 'font-arabic' : ''}`}>
                {t.soul.text}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Appreciation Post Gallery */}
      <section className="py-32 bg-[var(--color-gela-cream)] border-t border-[var(--color-gela-espresso)]/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className={`text-[10px] uppercase tracking-[0.4em] text-[var(--color-gela-green)] font-bold mb-6 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}
          >
            {t.appreciation.label}
          </motion.span>
          <h2 className={`font-heading text-5xl md:text-8xl text-[var(--color-gela-espresso)] leading-[0.85] tracking-tighter mb-8 ${isRTL ? 'font-arabic leading-tight' : ''}`}>
            {t.appreciation.title} <span className="italic font-light text-[var(--color-gela-green)]">{t.appreciation.highlight}</span>
          </h2>
          <p className={`text-xl font-light text-[var(--color-gela-espresso)]/50 ${isRTL ? 'font-arabic' : ''}`}>
            {t.appreciation.subtitle}
          </p>
        </div>

        {/* Masonry-style Grid - Reduced & Curated */}
        <div className="px-4">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {[10, 15, 16, 17, 18, 20, 22, 23, 24, 25, 27, 28].map((num) => (
              <motion.div
                key={num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[24px] md:rounded-[32px] group"
              >
                <img src={`/ourstory/story1 (${num}).jpg`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}

            {[4, 5, 8, 9].map((num) => (
              <motion.div
                key={`vid-${num}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[32px] aspect-[9/16]"
              >
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src={`/ourstory/story1 (${num}).mp4`} type="video/mp4" />
                </video>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const TRANSLATIONS = {
  en: {
    nav: { about: 'About', menu: 'Menu', story: 'Our Story', visitus: 'Visit Us', careers: 'Careers', order: 'Order Now' },
    hero: { title: 'Sip. Savor.', stay: 'Stay.', desc: 'Experience the perfect blend of artisanal coffee, premium matcha, and authentic gelato.', button: 'View Menu', scroll: 'Scroll' },
    about: {
      ch1: { label: 'The Beginning', title: 'A space to', highlight: 'Breathe.', text: 'Located in the heart of Mashael Alnour, Sohar, Gela Cafe was born from a simple desire: to create a sanctuary from the everyday hustle.' },
      ch2: { label: 'The Artistry', title: 'Crafted with', highlight: 'Intention.', text: 'We believe that great coffee and exquisite desserts are best enjoyed in an environment that feels like a warm embrace. Every pour, every scoop, and every smile is intentional.' },
      ch3: { label: 'The Soul', title: 'Your home away', highlight: 'from home.', text: '"Whether you\'re here for a quiet morning with a book or a catch-up with friends, our space is designed to make you feel at home."' }
    },
    menu: { label: 'The Collection', title: 'Discover', highlight: 'Artistry.', featured: 'Featured Selection', detailed: 'Detailed Selection' },
    gallery: { label: 'Visual Savor', title: 'The Gela', highlight: 'Journal.', bg: 'MOMENTS' },
    visit: {
      bg: 'EXPERIENCE',
      label: 'Our Sanctuary',
      title: 'Explore',
      highlight: 'the Space.',
      find: { title: 'Find Us', addr: 'Mashael Alnour, Sohar 311\nSultanate of Oman', cta: 'Get Directions' },
      hours: { title: 'Hours', sunWed: 'Sun–Wed', thuSat: 'Thu–Sat', am: 'AM', pm: 'PM', status: 'Open Today' },
      contact: { title: 'Say Hello', cta: 'Order now' }
    },
    footer: {
      desc: 'Artisanal coffee and authentic experiences in the heart of Sohar. Every cup is brewed with intention.',
      nav: 'Navigation',
      stay: 'Stay Inspired',
      newsDesc: 'Join our community for exclusive events and new menu arrivals.',
      placeholder: 'E-mail address',
      madeWith: 'Made with',
      intention: 'Intention',
      in: 'in',
      oman: 'Oman',
      rights: 'GELA CAFE'
    }
  },
  ar: {
    nav: { about: 'من نحن', menu: 'القائمة', story: 'قصتنا', visitus: 'زورونا', careers: 'الوظائف', order: 'اطلب الآن' },
    hero: { title: 'رشفة. تذوق.', stay: 'استرخِ.', desc: 'استمتع بالمزيج المثالي من القهوة المختصة، الماتشا الفاخرة، والجيلاتو الأصيل.', button: 'عرض القائمة', scroll: 'مرر للأسفل' },
    about: {
      ch1: { label: 'البداية', title: 'مساحة لـ', highlight: 'التنفس.', text: 'يقع جيلا كافيه في قلب مشاعل النور، صحار، وقد وُلد من رغبة بسيطة: خلق ملاذ من صخب الحياة اليومية.' },
      ch2: { label: 'الإبداع', title: 'صُنع بـ', highlight: 'عناية.', text: 'نؤمن بأن القهوة الرائعة والحلويات الرائعة تُستمتع بها بشكل أفضل في بيئة تشعر وكأنها حضن دافئ. كل سكب، كل ملعقة، وكل ابتسامة مقصودة.' },
      ch3: { label: 'الروح', title: 'بيتك الثاني', highlight: 'بعيداً عن البيت.', text: '"سواء كنت هنا لقضاء صباح هادئ مع كتاب أو لقاء مع الأصدقاء، فإن مساحتنا مصممة لتجعلك تشعر وكأنك في بيتك."' }
    },
    menu: { label: 'المجموعة', title: 'اكتشف', highlight: 'الفن.', featured: 'اختيارات مميزة', detailed: 'اختيارات مفصلة' },
    gallery: { label: 'متعة بصرية', title: 'يوميات', highlight: 'جيلا.', bg: 'لحظات' },
    visit: {
      bg: 'تجربة',
      label: 'ملاذنا',
      title: 'استكشف',
      highlight: 'المكان.',
      find: { title: 'تجدنا هنا', addr: 'مشاعل النور، صحار 311\nسلطنة عُمان', cta: 'احصل على الاتجاهات' },
      hours: { title: 'ساعات العمل', sunWed: 'الأحد–الأربعاء', thuSat: 'الخميس–السبت', am: 'صباحاً', pm: 'مساءً', status: 'مفتوح اليوم' },
      contact: { title: 'تواصل معنا', cta: 'اطلب الآن' }
    },
    footer: {
      desc: 'قهوة مختصة وتجارب أصيلة في قلب صحار. كل كوب يُحضر بكل حب.',
      nav: 'التنقل',
      stay: 'ابقَ ملهماً',
      newsDesc: 'انضم إلى مجتمعنا لمعرفة الأحداث الحصرية والجديد في قائمتنا.',
      placeholder: 'البريد الإلكتروني',
      madeWith: 'صُنع بـ',
      intention: 'إتقان',
      in: 'في',
      oman: 'عُمان',
      rights: 'جيلا كافيه'
    }
  }
};

export default function App() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const t = TRANSLATIONS[lang];
  const isRTL = lang === 'ar';

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [view, setView] = useState<'landing' | 'story'>('landing');
  const [activeMenuCategory, setActiveMenuCategory] = useState(MENU_CATEGORIES[0].id);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(0);
  const [gyroPermission, setGyroPermission] = useState<"default" | "granted" | "denied">("default");
  const [isFooterNavOpen, setIsFooterNavOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  // Mouse tracking for interactive hero
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0);

  // Gyroscope tracking for mobile
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Gamma: -90 to 90. Map -30 to 30 to 0 to width (more sensitive)
        const xPercent = Math.max(0, Math.min(100, ((e.gamma + 30) / 60) * 100));
        const x = (xPercent / 100) * window.innerWidth;

        // Beta: -180 to 180. Map 20 to 60 to 0 to height (more sensitive)
        const yPercent = Math.max(0, Math.min(100, ((e.beta - 20) / 40) * 100));
        const y = (yPercent / 100) * window.innerHeight;

        mouseX.set(x);
        mouseY.set(y);
      }
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      if (typeof (DeviceOrientationEvent as any).requestPermission !== 'function') {
        window.addEventListener('deviceorientation', handleOrientation);
      } else if (gyroPermission === 'granted') {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    // Proactive permission request on first touch for iOS
    const handleFirstTouch = () => {
      if (gyroPermission === 'default') {
        requestGyroPermission();
      }
      window.removeEventListener('touchstart', handleFirstTouch);
    };
    window.addEventListener('touchstart', handleFirstTouch);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation);
        window.removeEventListener('touchstart', handleFirstTouch);
      }
    };
  }, [mouseX, mouseY, gyroPermission]);

  const requestGyroPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        setGyroPermission(permission);
      } catch (error) {
        console.error("Gyro permission error:", error);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  // Smooth springs for the blobs
  const blobX1 = useSpring(useTransform(mouseX, v => v - 200), { damping: 18, stiffness: 60 });
  const blobY1 = useSpring(useTransform(mouseY, v => v - 200), { damping: 18, stiffness: 60 });

  const blobX2 = useSpring(useTransform(mouseX, v => v - 150), { damping: 25, stiffness: 50 });
  const blobY2 = useSpring(useTransform(mouseY, v => v - 150), { damping: 25, stiffness: 50 });

  // Parallax for images/text - using direct mapping for more obvious motion
  const parallaxX1 = useSpring(useTransform(mouseX, (v) => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    return (v - width / 2) * 0.15; // 15% of distance from center
  }), { damping: 28, stiffness: 120 });

  const parallaxY1 = useSpring(useTransform(mouseY, (v) => {
    const height = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    const offset = (v - height / 2) * 0.15;
    return isDesktop ? Math.max(offset, 0) : offset;
  }), { damping: 28, stiffness: 120 });

  const parallaxX2 = useSpring(useTransform(mouseX, (v) => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1000;
    return (v - width / 2) * 0.3; // 30% of distance from center
  }), { damping: 28, stiffness: 120 });

  const parallaxY2 = useSpring(useTransform(mouseY, (v) => {
    const height = typeof window !== 'undefined' ? window.innerHeight : 1000;
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
    const offset = (v - height / 2) * 0.3;
    return isDesktop ? Math.max(offset, 0) : offset;
  }), { damping: 28, stiffness: 120 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLightHeader = view === 'story' && !isScrolled;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-gela-cream)] font-sans text-[var(--color-gela-espresso)] selection:bg-[var(--color-gela-green)] selection:text-[var(--color-gela-cream)]">
      {/* Header / Navigation - Full Width Iconic */}
      <nav
        dir="ltr"
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-700 py-2 md:py-3 ${isScrolled
            ? 'bg-[var(--color-gela-cream)]/90 backdrop-blur-md border-b border-[var(--color-gela-espresso)]/5'
            : 'bg-transparent border-b border-transparent'
          }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">

          {/* Logo */}
          <motion.button
            onClick={() => {
              setView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative flex items-center gap-2 shrink-0 z-10"
            whileHover={{ scale: 1.02 }}
          >
            <span className={`font-brand tracking-[0.15em] transition-all duration-500 group-hover:text-[var(--color-gela-green)] text-2xl md:text-3xl uppercase ${isLightHeader ? 'text-white' : 'text-[var(--color-gela-espresso)]'}`}>
              GELA
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gela-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.button>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 space-x-12">
            {['About', 'Menu', 'Story', 'Visit Us'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === 'Story') {
                    setView('story');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setView('landing');
                    setTimeout(() => scrollToSection(item.toLowerCase().replace(' ', '-')), 100);
                  }
                }}
                className={`transition-all duration-300 relative group whitespace-nowrap font-semibold ${isRTL ? 'font-arabic tracking-normal text-xl' : 'text-[13px] uppercase tracking-[0.3em]'} ${isLightHeader ? 'text-white/80 hover:text-white' : 'text-[var(--color-gela-espresso)]/80 hover:text-[var(--color-gela-espresso)]'} ${view === 'story' && item === 'Story' ? (isLightHeader ? '!text-white' : '!text-[var(--color-gela-espresso)]') : ''}`}
              >
                {t.nav[item.toLowerCase().replace(' ', '') as keyof typeof t.nav]}
                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[1px] transition-all duration-500 ${isLightHeader ? 'bg-white' : 'bg-[var(--color-gela-espresso)]'} ${(view === 'story' && item === 'Story') || (view === 'landing' && item !== 'Story' && false) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </div>

          {/* Action / Menu Button */}
          <div className="flex items-center gap-6 z-10">
            {/* Language Switcher - Oman/UK Flag SVGs */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className={`flex items-center justify-center border rounded-full transition-all duration-500 w-10 h-10 group overflow-hidden ${isLightHeader ? 'border-white/20 hover:bg-white hover:text-black' : 'border-[var(--color-gela-espresso)]/20 hover:bg-[var(--color-gela-espresso)] hover:text-white'}`}
              title={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center group-hover:scale-110 transition-transform">
                {lang === 'en' ? (
                  /* Oman Flag SVG */
                  <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
                    <rect width="900" height="600" fill="#fff" />
                    <rect width="900" height="400" y="200" fill="#008000" />
                    <rect width="900" height="200" y="200" fill="#d21034" />
                    <rect width="300" height="600" fill="#d21034" />
                    <path d="M150 40 L170 70 L150 100 L130 70 Z" fill="#fff" />
                  </svg>
                ) : (
                  /* UK Flag SVG */
                  <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
                    <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6" />
                    <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4" />
                    <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10" />
                    <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6" />
                  </svg>
                )}
              </div>
            </button>

            <button
              onClick={() => scrollToSection('visit-us')}
              className={`hidden sm:flex items-center justify-center border rounded-full uppercase tracking-[0.2em] font-bold transition-all duration-500 px-6 py-2.5 ${isRTL ? 'font-arabic text-lg tracking-normal' : 'text-[12px]'} ${isLightHeader ? 'border-white/20 text-white hover:bg-white hover:text-black' : 'border-[var(--color-gela-espresso)]/20 text-[var(--color-gela-espresso)] hover:bg-[var(--color-gela-espresso)] hover:text-white'}`}
            >
              {t.nav.order}
            </button>

            {/* Hamburger Menu Button - Visible on mobile only */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="relative flex md:hidden flex-col items-center justify-center gap-1.5 w-7 h-7"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className={`rounded-full w-5 h-0.5 ${isLightHeader ? 'bg-white' : 'bg-[var(--color-gela-espresso)]'}`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`rounded-full w-5 h-0.5 ${isLightHeader ? 'bg-white' : 'bg-[var(--color-gela-espresso)]'}`}
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className={`rounded-full w-5 h-0.5 ${isLightHeader ? 'bg-white' : 'bg-[var(--color-gela-espresso)]'}`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[var(--color-gela-cream)] flex flex-col"
          >
            <div className="flex justify-between items-center p-8">
              <span className="font-brand text-3xl tracking-[0.15em] uppercase">GELA</span>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-10 px-8">
              {['About', 'Menu', 'Story', 'Visit Us'].map((item, idx) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item === 'Story') {
                      setView('story');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      setView('landing');
                      setTimeout(() => scrollToSection(item.toLowerCase().replace(' ', '-')), 300);
                    }
                  }}
                  className={`text-4xl font-heading tracking-tighter hover:italic transition-all duration-500 text-center ${isRTL ? 'font-arabic' : ''}`}
                >
                  {t.nav[item.toLowerCase().replace(' ', '') as keyof typeof t.nav]}
                </motion.button>
              ))}
            </div>

            <div className="p-12 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-gela-espresso)]/40 mb-4">Follow us</p>
              <div className="flex justify-center gap-6">
                <a href="https://www.instagram.com/gela.om/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-gela-green)] transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.main
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Interactive Hero Section */}
            <section
              id="hero"
              className="relative h-screen flex items-center justify-center overflow-hidden bg-[var(--color-gela-cream)]"
              onMouseMove={handleMouseMove}
            >
              {/* Interactive Blobs */}
              <motion.div
                className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-40 pointer-events-none mix-blend-multiply"
                style={{
                  background: 'var(--color-gela-green)',
                  x: blobX1,
                  y: blobY1,
                  left: 0,
                  top: 0
                }}
              />
              <motion.div
                className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-30 pointer-events-none mix-blend-multiply"
                style={{
                  background: 'var(--color-gela-matcha)',
                  x: blobX2,
                  y: blobY2,
                  left: 0,
                  top: 0
                }}
              />

              {/* Floating Parallax Images Removed */}

              {/* Main Content */}
              <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pointer-events-none flex flex-col items-center">
                <motion.h1
                  style={{ x: parallaxX2, y: parallaxY2 }}
                  className={`font-heading text-5xl md:text-8xl lg:text-9xl text-[var(--color-gela-espresso)] leading-[1.1] tracking-tight mb-12 md:mb-10 ${isRTL ? 'font-arabic leading-[1.2]' : ''}`}
                >
                  {t.hero.title}<br />
                  <span className="text-[var(--color-gela-green)] italic font-light">{t.hero.stay}</span>
                </motion.h1>

                <motion.p
                  style={{ x: parallaxX1, y: parallaxY1 }}
                  className={`text-base md:text-xl text-[var(--color-gela-espresso)]/80 font-light mb-12 md:mb-10 max-w-lg mx-auto ${isRTL ? 'font-arabic leading-relaxed' : ''}`}
                >
                  {t.hero.desc}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="pointer-events-auto"
                >
                  <button
                    onClick={() => {
                      scrollToSection('menu');
                      requestGyroPermission();
                    }}
                    className={`inline-flex items-center justify-center px-10 py-4 bg-[var(--color-gela-espresso)] text-white uppercase tracking-widest text-sm rounded-full hover:bg-[var(--color-gela-green)] transition-all duration-500 hover:scale-105 ${isRTL ? 'font-arabic tracking-normal' : ''}`}
                  >
                    {t.hero.button}
                  </button>
                </motion.div>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 text-[var(--color-gela-espresso)]/50"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className={`text-xs uppercase tracking-widest ${isRTL ? 'font-arabic' : ''}`}>{t.hero.scroll}</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--color-gela-espresso)]/50 to-transparent" />
              </motion.div>
            </section>

            {/* Storytelling About Section */}
            <section id="about" className="py-40 bg-[var(--color-gela-cream)] overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Chapter 1: The Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-40">
                  <div className={`lg:col-span-7 ${isRTL ? 'lg:order-2' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className={`absolute -top-10 font-mono text-[120px] opacity-[0.03] select-none ${isRTL ? '-right-10' : '-left-10'}`}>01</div>
                      <span className={`text-[10px] uppercase tracking-[0.4em] text-[var(--color-gela-green)] font-bold mb-6 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}>{t.about.ch1.label}</span>
                      <h2 className={`font-heading text-5xl md:text-7xl lg:text-8xl text-[var(--color-gela-espresso)] leading-[0.9] tracking-tighter mb-10 ${isRTL ? 'font-arabic leading-[1.2]' : ''}`}>
                        {t.about.ch1.title} <br />
                        <span className="italic font-light text-[var(--color-gela-green)]">{t.about.ch1.highlight}</span>
                      </h2>
                      <div className={`h-[1px] w-24 bg-[var(--color-gela-green)] mb-10 ${isRTL ? 'mr-0 ml-auto' : ''}`} />
                      <p className={`text-xl md:text-2xl leading-relaxed text-[var(--color-gela-espresso)]/80 font-light max-w-xl ${isRTL ? 'font-arabic' : ''}`}>
                        {t.about.ch1.text}
                      </p>
                    </motion.div>
                  </div>
                  <div className={`lg:col-span-5 ${isRTL ? 'lg:order-1' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      className={`aspect-[3/4] rounded-[40px] overflow-hidden shadow-2xl transition-transform duration-700 ${isRTL ? '-rotate-2 hover:rotate-0' : 'rotate-2 hover:rotate-0'}`}
                    >
                      <img
                        src="/sanctuary.jpg"
                        alt="Gela Sanctuary"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center mb-40">
                  <div className={`lg:col-span-5 order-2 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=1000&auto=format&fit=crop"
                        alt="Matcha Preparation"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                  <div className={`lg:col-span-7 order-1 ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className={`relative ${isRTL ? 'lg:pr-12' : 'lg:pl-12'}`}
                    >
                      <div className={`absolute -top-10 font-mono text-[120px] opacity-[0.03] select-none ${isRTL ? '-left-10' : '-right-10'}`}>02</div>
                      <span className={`text-[10px] uppercase tracking-[0.4em] text-[var(--color-gela-green)] font-bold mb-6 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}>{t.about.ch2.label}</span>
                      <h2 className={`font-heading text-5xl md:text-7xl lg:text-8xl text-[var(--color-gela-espresso)] leading-[0.9] tracking-tighter mb-10 ${isRTL ? 'font-arabic leading-[1.2]' : ''}`}>
                        {t.about.ch2.title} <br />
                        <span className="italic font-light text-[var(--color-gela-green)]">{t.about.ch2.highlight}</span>
                      </h2>
                      <p className={`text-xl md:text-2xl leading-relaxed text-[var(--color-gela-espresso)]/80 font-light max-w-xl ${isRTL ? 'font-arabic' : ''}`}>
                        {t.about.ch2.text}
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Chapter 3: The Community */}
                <div className="text-center max-w-4xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <span className={`text-[10px] uppercase tracking-[0.4em] text-[var(--color-gela-green)] font-bold mb-6 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}>{t.about.ch3.label}</span>
                    <h2 className={`font-heading text-6xl md:text-9xl text-[var(--color-gela-espresso)] leading-[0.8] tracking-tighter mb-12 ${isRTL ? 'font-arabic leading-[1.1]' : ''}`}>
                      {t.about.ch3.title} <br />
                      <span className="italic font-light text-[var(--color-gela-green)]">{t.about.ch3.highlight}</span>
                    </h2>
                    <p className={`text-xl md:text-3xl leading-relaxed text-[var(--color-gela-espresso)]/60 font-light italic ${isRTL ? 'font-arabic' : ''}`}>
                      {t.about.ch3.text}
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Compact & Density-Focused Menu Section */}
            <section id="menu" className="py-24 bg-[var(--color-gela-cream)] relative overflow-hidden">
              {/* Subtle Decorative Elements */}
              <div className="absolute top-0 right-0 w-1/4 h-full bg-[var(--color-gela-green)]/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

              <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                  <div className="max-w-xl">
                    <motion.span
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      className={`text-[10px] uppercase tracking-[0.4em] text-[var(--color-gela-green)] font-bold mb-4 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}
                    >
                      {t.menu.label}
                    </motion.span>
                    <h2 className={`font-heading text-5xl md:text-7xl text-[var(--color-gela-espresso)] leading-[0.9] tracking-tighter ${isRTL ? 'font-arabic leading-[1.2]' : ''}`}>
                      {t.menu.title} <span className="italic font-light text-[var(--color-gela-green)]">{t.menu.highlight}</span>
                    </h2>
                  </div>

                  {/* Compact Category Navigation */}
                  <div className="flex flex-wrap gap-2">
                    {MENU_CATEGORIES.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setActiveMenuCategory(category.id);
                          setHoveredItemIndex(0);
                        }}
                        className={`px-8 py-3.5 rounded-full transition-all duration-500 border ${activeMenuCategory === category.id
                            ? 'bg-[var(--color-gela-espresso)] text-white border-[var(--color-gela-espresso)] shadow-xl'
                            : 'bg-transparent text-[var(--color-gela-espresso)] border-[var(--color-gela-espresso)]/20 hover:border-[var(--color-gela-espresso)]'
                          } ${isRTL ? 'text-xl font-arabic' : 'text-base uppercase tracking-widest font-bold'}`}
                      >
                        {category[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  {/* Menu Items - Compact Dual Column List */}
                  <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeMenuCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-12"
                      >
                        {MENU_DATA[activeMenuCategory as keyof typeof MENU_DATA].map((item: any, index: number) => (
                          <motion.div
                            key={item.en}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative flex items-center justify-between py-5 border-b border-[var(--color-gela-espresso)]/10 cursor-pointer overflow-hidden px-4"
                            onMouseEnter={() => setHoveredItemIndex(index)}
                          >
                            {/* Hover Background Effect */}
                            <div className="absolute inset-0 bg-[var(--color-gela-green)]/5 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

                            <div className="relative z-10 flex items-baseline gap-4">
                              <span className="font-mono text-[9px] opacity-30 group-hover:opacity-100 transition-opacity">
                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                              </span>
                              <h3 className={`font-heading text-lg md:text-xl text-[var(--color-gela-espresso)] group-hover:translate-x-1 transition-transform duration-500 ${isRTL ? 'font-arabic' : ''}`}>
                                {item[lang]}
                              </h3>
                            </div>

                            <div className="relative z-10 flex items-center gap-4">
                              <span className="font-mono text-xs font-medium text-[var(--color-gela-espresso)]/40 group-hover:text-[var(--color-gela-green)] transition-colors">
                                {item.price}
                              </span>
                              <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1" />
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Visual Showcase - Smaller Sticky Card */}
                  <div className="lg:col-span-4 sticky top-32 hidden lg:block">
                    <div className="relative group p-4 bg-white rounded-[32px] shadow-sm border border-[var(--color-gela-espresso)]/5">
                      <div className="aspect-square rounded-2xl overflow-hidden shadow-inner bg-[var(--color-gela-espresso)]/5">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={`${activeMenuCategory}-${hoveredItemIndex}`}
                            src={getMenuImage(activeMenuCategory, hoveredItemIndex)}
                            alt="Menu Item"
                            initial={{ opacity: 0, filter: 'blur(5px)' }}
                            animate={{ opacity: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(5px)' }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                            referrerPolicy="no-referrer"
                          />
                        </AnimatePresence>
                      </div>

                      <div className="mt-6">
                        <motion.h4
                          key={`${activeMenuCategory}-${hoveredItemIndex}-title`}
                          initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`font-heading text-xl text-[var(--color-gela-espresso)] mb-2 ${isRTL ? 'font-arabic' : ''}`}
                        >
                          {MENU_DATA[activeMenuCategory as keyof typeof MENU_DATA][hoveredItemIndex]?.[lang]}
                        </motion.h4>
                        <p className={`text-[9px] uppercase tracking-[0.2em] text-[var(--color-gela-green)] font-bold ${isRTL ? 'font-arabic tracking-normal' : ''}`}>{t.menu.featured}</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Image Reveal */}
                  <div className="lg:hidden mt-12 grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-sm">
                      <img
                        src={getMenuImage(activeMenuCategory, hoveredItemIndex)}
                        alt="Menu Item"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[10px] uppercase tracking-widest text-[var(--color-gela-green)] font-bold mb-2">Detailed Selection</p>
                      <h4 className={`font-heading text-2xl text-[var(--color-gela-espresso)] ${isRTL ? 'font-arabic' : ''}`}>
                        {MENU_DATA[activeMenuCategory as keyof typeof MENU_DATA][hoveredItemIndex]?.[lang]}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Visual Savor: Infinite Parallax Gallery */}
            <section id="gallery" className="py-24 bg-[var(--color-gela-green)] relative overflow-hidden">
              {/* Background Highlight Text Removed as requested */}

              <div className="relative z-10 flex flex-col gap-8 md:gap-12">
                <div className="px-6 md:px-12 max-w-7xl mx-auto w-full">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className={`text-[10px] uppercase tracking-[0.4em] text-[var(--color-gela-cream)]/60 font-bold mb-4 block text-center md:text-left ${isRTL ? 'md:text-right font-arabic tracking-normal' : ''}`}
                  >
                    {t.gallery.label}
                  </motion.span>
                  <h2 className={`font-heading text-4xl md:text-6xl text-white leading-[0.9] tracking-tighter text-center md:text-left ${isRTL ? 'md:text-right font-arabic leading-[1.2]' : ''}`}>
                    {t.gallery.title} <span className="italic font-light text-[var(--color-gela-cream)]/40">{t.gallery.highlight}</span>
                  </h2>
                </div>

                <div className="flex flex-col gap-6 md:gap-8 overflow-hidden">
                  {/* Row 1: Running Carousel (Forced LTR to prevent Arabic gap) */}
                  <div className="flex group" dir="ltr">
                    <motion.div
                      animate={{ x: [0, -2500] }}
                      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                      className="flex gap-4 md:gap-8 flex-nowrap shrink-0"
                    >
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-4 md:gap-8 shrink-0">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <motion.div
                              key={`${i}-${num}`}
                              className="w-[300px] md:w-[450px] aspect-[4/5] rounded-3xl overflow-hidden glass shadow-2xl shrink-0 border border-white/10"
                            >
                              <img
                                src={`/1 (${num}).jpg`}
                                alt={`Gallery ${num}`}
                                className="w-full h-full object-cover saturate-[0.85]"
                                referrerPolicy="no-referrer"
                              />
                            </motion.div>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Row 2: Running Carousel (Reverse) */}
                  <div className="flex group" dir="ltr">
                    <motion.div
                      animate={{ x: [-2500, 0] }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="flex gap-4 md:gap-8 flex-nowrap shrink-0"
                    >
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex gap-4 md:gap-8 shrink-0">
                          {[6, 7, 8, 9, 10].map((num) => (
                            <motion.div
                              key={`${i}-${num}`}
                              className="w-[320px] md:w-[480px] aspect-[16/10] rounded-3xl overflow-hidden glass shadow-2xl shrink-0 border border-white/10"
                            >
                              <img
                                src={`/1 (${num}).jpg`}
                                alt={`Gallery ${num}`}
                                className="w-full h-full object-cover saturate-[0.85]"
                                referrerPolicy="no-referrer"
                              />
                            </motion.div>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
            <section id="visit-us" className="py-32 bg-[var(--color-gela-cream)] relative overflow-hidden">
              {/* Background Decorative Text */}
              <div className="absolute top-20 left-10 pointer-events-none select-none opacity-[0.03] font-heading text-[15vw] leading-none font-bold text-[var(--color-gela-green)]">
                EXPERIENCE
              </div>

              <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

                  {/* Panel 1: Visual Experience */}
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="lg:w-5/12 relative group rounded-[40px] overflow-hidden aspect-square"
                  >
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img
                        src="/newsanctuary.jpg"
                        alt="Cafe Interior"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-gela-green)]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
                    </motion.div>

                    <div className="absolute bottom-10 left-10 right-10">
                      <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`text-[10px] uppercase tracking-[0.4em] text-white/70 font-bold mb-4 block ${isRTL ? 'font-arabic tracking-normal' : ''}`}
                      >
                        {t.visit.label}
                      </motion.span>
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className={`font-heading text-4xl md:text-5xl lg:text-6xl text-white leading-[0.9] tracking-tighter ${isRTL ? 'font-arabic leading-[1.2]' : ''}`}
                      >
                        {t.visit.title} <br />
                        <span className="italic font-light">{t.visit.highlight}</span>
                      </motion.h2>
                    </div>
                  </motion.div>

                  {/* Panel 2 & 3: Discovery & Connection */}
                  <div className="lg:w-7/12 flex flex-col gap-8 md:gap-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 flex-1">

                      {/* Discovery Card (Map Visual) */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-[var(--color-gela-green)] rounded-[40px] p-10 flex flex-col justify-between text-[var(--color-gela-cream)] group relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-gela-cream)]/5 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700" />

                        <div>
                          <MapPin className={`w-10 h-10 mb-8 text-[var(--color-gela-green)] bg-[var(--color-gela-cream)] p-2 rounded-xl ${isRTL ? 'ml-0' : ''}`} strokeWidth={1.5} />
                          <h3 className={`font-heading text-3xl mb-4 ${isRTL ? 'font-arabic' : ''}`}>{t.visit.find.title}</h3>
                          <p className={`font-light text-[var(--color-gela-cream)]/70 text-lg whitespace-pre-line ${isRTL ? 'font-arabic' : ''}`}>
                            {t.visit.find.addr}
                          </p>
                        </div>

                        <a
                          href="https://maps.app.goo.gl/jf8SJ2bWmSWUZFJz6"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-4 text-xs uppercase tracking-[0.3em] font-bold group-hover:gap-6 transition-all mt-12 ${isRTL ? 'font-arabic tracking-normal' : ''}`}
                        >
                          {t.visit.find.cta} <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </a>
                      </motion.div>

                      {/* Connection Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-[40px] p-10 border border-[var(--color-gela-espresso)]/5 shadow-sm flex flex-col justify-between group"
                      >
                        <div>
                          <Clock className="w-10 h-10 mb-8 text-[var(--color-gela-green)]" strokeWidth={1.5} />
                          <h3 className={`font-heading text-3xl mb-6 text-[var(--color-gela-espresso)] ${isRTL ? 'font-arabic' : ''}`}>{t.visit.hours.title}</h3>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm font-medium text-[var(--color-gela-espresso)]/60">
                              <span className={isRTL ? 'font-arabic' : ''}>{t.visit.hours.sunWed}</span>
                              <span className={`text-[var(--color-gela-espresso)] ${isRTL ? 'font-arabic' : ''}`}>9 {t.visit.hours.am} – 10 {t.visit.hours.pm}</span>
                            </div>
                            <div className="w-full h-[1px] bg-[var(--color-gela-espresso)]/5" />
                            <div className="flex justify-between items-center text-sm font-medium text-[var(--color-gela-espresso)]/60">
                              <span className={isRTL ? 'font-arabic' : ''}>{t.visit.hours.thuSat}</span>
                              <span className={`text-[var(--color-gela-espresso)] ${isRTL ? 'font-arabic' : ''}`}>9 {t.visit.hours.am} – 11 {t.visit.hours.pm}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-12 flex items-center justify-between">
                          <span className={`text-[10px] uppercase tracking-widest font-bold opacity-30 ${isRTL ? 'font-arabic tracking-normal' : ''}`}>{t.visit.hours.status}</span>
                          <div className="w-2 h-2 rounded-full bg-[var(--color-gela-green)] animate-pulse" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Bottom Interactive Contact Bar */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="bg-[var(--color-gela-cream)] border-2 border-[var(--color-gela-green)]/10 rounded-[40px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12"
                    >
                      <div className="flex items-center gap-8">
                        <div className="w-16 h-16 rounded-full bg-[var(--color-gela-green)]/5 flex items-center justify-center">
                          <Phone className="w-6 h-6 text-[var(--color-gela-green)]" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className={`font-heading text-xl text-[var(--color-gela-espresso)] ${isRTL ? 'font-arabic' : ''}`}>{t.visit.contact.title}</h4>
                          <p className={`text-2xl md:text-3xl font-light text-[var(--color-gela-green)] ${isRTL ? 'font-sans' : ''}`} dir="ltr">+968 7661 8357</p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href="https://wa.me/96876618357"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-8 py-4 bg-[var(--color-gela-espresso)] text-white rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-[var(--color-gela-green)] transition-all duration-500 ${isRTL ? 'font-arabic tracking-normal' : ''}`}
                        >
                          {t.visit.contact.cta}
                        </a>
                      </div>
                    </motion.div>

                  </div>
                </div>

                {/* Unique 'Our Story' Widget - Centered */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-20 flex justify-center"
                >
                  <button
                    onClick={() => {
                      setView('story');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="group relative flex items-center gap-6 p-1 pr-8 bg-white/40 backdrop-blur-xl border border-white/20 rounded-full hover:bg-white/60 transition-all duration-700 shadow-2xl hover:shadow-[0_20px_50px_rgba(45,84,60,0.1)] overflow-hidden"
                  >
                    <div className="w-12 h-12 rounded-full bg-[var(--color-gela-green)] flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-1000">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left flex flex-col items-start translate-x-0 group-hover:translate-x-1 transition-transform duration-500">
                      <span className={`text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--color-gela-green)] ${isRTL ? 'font-arabic tracking-normal' : ''}`}>
                        {isRTL ? 'اكتشف' : 'Discover'}
                      </span>
                      <span className={`text-lg font-heading tracking-tight text-[var(--color-gela-espresso)] ${isRTL ? 'font-arabic' : ''}`}>
                        {isRTL ? 'قصتنا الكاملة' : 'Our Full Story'}
                      </span>
                    </div>

                    {/* Decorative background glow */}
                    <div className="absolute -right-4 -top-8 w-24 h-24 bg-[var(--color-gela-green)]/10 blur-2xl rounded-full" />
                  </button>
                </motion.div>
              </div>
            </section>

          </motion.main>
        ) : (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <OurStory isRTL={isRTL} lang={lang} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Optimized Aesthetic Footer */}
      <footer className="relative bg-[var(--color-gela-green)] text-[var(--color-gela-cream)] pt-16 pb-12 overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <motion.div layout className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 mb-16">

            {/* Column 1: Brand & Soul */}
            <div className="lg:col-span-5">
              <motion.div
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="font-brand text-4xl tracking-[0.15em] mb-8 uppercase">GELA</h3>
                <p className={`text-xl md:text-2xl font-light leading-relaxed text-[var(--color-gela-cream)]/70 mb-10 max-w-sm ${isRTL ? 'font-arabic' : ''}`}>
                  {t.footer.desc}
                </p>

                <div className="flex gap-4">
                  {[
                    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/gela.om/' },
                    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/96876618357' },
                    { icon: Mail, label: 'Email', href: 'mailto:hello@gelacafe.com' }
                  ].map((social, idx) => (
                    <a
                      key={idx}
                      href={social.href}
                      className="w-12 h-12 rounded-full border border-[var(--color-gela-cream)]/20 flex items-center justify-center hover:bg-[var(--color-gela-green)] hover:border-[var(--color-gela-green)] transition-all duration-500 group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-[var(--color-gela-cream)] group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Column 2: Navigation */}
            <div className="lg:col-span-3">
              <motion.div
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="h-full"
              >
                {/* Mobile Header (Dropdown) */}
                <button
                  onClick={() => setIsFooterNavOpen(!isFooterNavOpen)}
                  className="flex items-center justify-between w-full lg:hidden mb-6 group"
                >
                  <h4 className={`text-[10px] uppercase tracking-[0.3em] font-bold text-white ${isRTL ? 'font-arabic tracking-normal' : ''}`}>
                    {t.footer.nav}
                  </h4>
                  <ChevronDown
                    className={`w-4 h-4 text-white/50 transition-transform duration-500 ${isFooterNavOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Desktop Header (Static) */}
                <h4 className={`hidden lg:block text-[10px] uppercase tracking-[0.3em] font-bold text-white mb-8 ${isRTL ? 'font-arabic tracking-normal' : ''}`}>
                  {t.footer.nav}
                </h4>

                {/* Desktop Menu - Always Visible */}
                <ul className="hidden lg:flex lg:flex-col space-y-4">
                  {['About', 'Menu', 'Story', 'Visit Us'].map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => {
                          if (item === 'Story') {
                            setView('story');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          } else {
                            setView('landing');
                            setTimeout(() => scrollToSection(item.toLowerCase().replace(' ', '-')), 100);
                          }
                        }}
                        className={`text-lg font-light text-[var(--color-gela-cream)]/60 hover:text-[var(--color-gela-cream)] transition-colors relative group ${isRTL ? 'font-arabic' : ''}`}
                      >
                        {t.nav[item.toLowerCase().replace(' ', '') as keyof typeof t.nav]}
                        <span className={`absolute -bottom-1 w-0 h-[1px] bg-[var(--color-gela-green)] transition-all duration-500 group-hover:w-full ${isRTL ? 'right-0' : 'left-0'}`} />
                      </button>
                    </li>
                  ))}
                </ul>

                {/* Mobile Menu - Toggleable */}
                <AnimatePresence>
                  {isFooterNavOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ 
                        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                        opacity: { duration: 0.25 }
                      }}
                      className="lg:hidden space-y-4 overflow-hidden pb-6"
                    >
                      {['About', 'Menu', 'Story', 'Visit Us'].map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => {
                              if (item === 'Story') {
                                setView('story');
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              } else {
                                setView('landing');
                                setTimeout(() => scrollToSection(item.toLowerCase().replace(' ', '-')), 100);
                              }
                            }}
                            className={`text-lg font-light text-[var(--color-gela-cream)]/60 hover:text-[var(--color-gela-cream)] transition-colors relative group ${isRTL ? 'font-arabic' : ''}`}
                          >
                            {t.nav[item.toLowerCase().replace(' ', '') as keyof typeof t.nav]}
                            <span className={`absolute -bottom-1 w-0 h-[1px] bg-[var(--color-gela-green)] transition-all duration-500 group-hover:w-full ${isRTL ? 'right-0' : 'left-0'}`} />
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Column 3: Newsletter */}
            <div className="lg:col-span-4">
              <motion.div
                layout="position"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 md:p-10 bg-[var(--color-gela-cream)]/5 rounded-[32px] border border-[var(--color-gela-cream)]/10 backdrop-blur-sm"
              >
                <h4 className={`text-[10px] uppercase tracking-[0.3em] font-bold text-white mb-6 ${isRTL ? 'font-arabic tracking-normal' : ''}`}>{t.footer.stay}</h4>
                <p className={`text-sm text-[var(--color-gela-cream)]/50 mb-8 ${isRTL ? 'font-arabic' : ''}`}>{t.footer.newsDesc}</p>

                <div className="relative">
                  <input
                    type="email"
                    placeholder={t.footer.placeholder}
                    className={`w-full bg-transparent border-b border-[var(--color-gela-cream)]/20 py-4 text-lg font-light focus:outline-none focus:border-[var(--color-gela-green)] transition-colors placeholder:text-[var(--color-gela-cream)]/20 ${isRTL ? 'font-arabic text-right' : ''}`}
                  />
                  <button className={`absolute top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--color-gela-green)] text-white hover:scale-110 transition-transform ${isRTL ? 'left-0' : 'right-0'}`}>
                    <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-[var(--color-gela-cream)]/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className={`flex flex-col md:flex-row items-center gap-4 md:gap-8 text-[10px] uppercase tracking-[0.2em] text-[var(--color-gela-cream)]/40 font-bold ${isRTL ? 'font-arabic tracking-normal' : ''}`}>
              <span>&copy; {new Date().getFullYear()} {t.footer.rights}</span>
              <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-[var(--color-gela-cream)]/10" />
              <div className="flex gap-6">
                <a href="#" className="hover:text-[var(--color-gela-cream)] transition-colors">Privacy</a>
                <a href="#" className="hover:text-[var(--color-gela-cream)] transition-colors">Terms</a>
              </div>
            </div>

            <div className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-gela-cream)]/40 font-bold italic ${isRTL ? 'font-arabic tracking-normal' : ''}`}>
              {t.footer.madeWith} <span className="text-white not-italic">{t.footer.intention}</span> {t.footer.in} <span className="text-[#FF3B30] not-italic">{t.footer.oman}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
