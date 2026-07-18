<script setup>
import { computed, ref, watchEffect } from "vue";
import ArrowRight from "iconoir-vue/regular/ArrowRight.js";
import CheckCircle from "iconoir-vue/regular/CheckCircle.js";
import Community from "iconoir-vue/regular/Community.js";
import Globe from "iconoir-vue/regular/Globe.js";
import LightBulb from "iconoir-vue/regular/LightBulb.js";
import Mail from "iconoir-vue/regular/Mail.js";
import Menu from "iconoir-vue/regular/Menu.js";
import MicrophoneSpeaking from "iconoir-vue/regular/MicrophoneSpeaking.js";
import Network from "iconoir-vue/regular/Network.js";
import ShieldCheck from "iconoir-vue/regular/ShieldCheck.js";
import ShoppingBag from "iconoir-vue/regular/ShoppingBag.js";
import Xmark from "iconoir-vue/regular/Xmark.js";
import { CONTACT_EMAIL, copy } from "./copy.js";

const pageName = window.location.pathname.split("/").pop()?.replace(".html", "");
const page = ["business", "company", "profile", "contact"].includes(pageName) ? pageName : "home";
const lang = ref(localStorage.getItem("wakyou-lang") || "ja");
const menuOpen = ref(false);
const sent = ref(false);
const t = computed(() => copy[lang.value] || copy.ja);
const serviceIcons = { trading: Globe, ec: ShoppingBag, creator: MicrophoneSpeaking };
const valueIcons = [ShieldCheck, LightBulb, Community, Globe];
const navItems = [["home", "/index.html"], ["business", "/business.html"], ["company", "/company.html"], ["profile", "/profile.html"]];

watchEffect(() => {
  document.documentElement.lang = lang.value === "zh" ? "zh-CN" : lang.value;
  document.title = t.value.meta[page];
});

function changeLanguage(next) {
  localStorage.setItem("wakyou-lang", next);
  lang.value = next;
  menuOpen.value = false;
}

function submit(event) {
  const data = new FormData(event.currentTarget);
  const fields = t.value.contact.fields;
  const subject = `[Wakyou Trading] ${data.get("category")} - ${data.get("company")}`;
  const body = `${fields.company}: ${data.get("company")}\n${fields.name}: ${data.get("name")}\n${fields.email}: ${data.get("email")}\n${fields.category}: ${data.get("category")}\n\n${data.get("message")}`;
  sent.value = true;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
</script>

<template>
  <div class="site-shell">
    <header class="site-header">
      <a class="brand" href="/index.html" aria-label="Wakyou Trading home">
        <img src="/assets/wakyou-mark.png" alt="" />
        <span><strong>WAKYOU TRADING</strong><small>株式会社和橋商事</small></span>
      </a>
      <button class="menu-button" aria-label="Toggle menu" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
        <Xmark v-if="menuOpen" />
        <Menu v-else />
      </button>
      <nav class="site-nav" :class="{ 'is-open': menuOpen }" aria-label="Main navigation">
        <a v-for="([key, href]) in navItems" :key="key" :href="href">{{ t.nav[key] }}</a>
        <div class="language-switcher" aria-label="Language">
          <button v-for="code in ['ja', 'zh', 'en']" :key="code" :class="{ active: lang === code }"
                  @click="changeLanguage(code)">{{ copy[code].lang }}
          </button>
        </div>
        <a class="nav-contact" href="/contact.html">{{ t.nav.contact }}</a>
      </nav>
    </header>

    <template v-if="page === 'home'">
      <section class="hero">
        <div class="hero-content">
          <span class="eyebrow on-dark">{{ t.home.heroEyebrow }}</span>
          <h1><span v-for="line in t.home.heroTitle.split('\n')" :key="line">{{ line }}</span></h1>
          <p class="hero-lead"><span v-for="line in t.home.heroLead.split('\n')" :key="line">{{ line }}</span></p>
          <p class="hero-sub">{{ t.home.heroSub }}</p>
          <div class="hero-actions">
            <a class="button gold" href="/business.html">{{ t.home.primary }}
              <ArrowRight />
            </a>
            <a class="button outline" href="/contact.html">{{ t.common.contact }}
              <ArrowRight />
            </a>
          </div>
        </div>
      </section>

      <section class="service-band" :aria-label="t.home.servicesLabel">
        <a v-for="(service, index) in t.home.services" :key="service.id" class="service-gateway"
           :class="{ primary: index === 0 }" :href="`/business.html#${service.id}`">
          <component :is="serviceIcons[service.id]" aria-hidden="true" />
          <div><span class="service-kicker">{{ service.subtitle }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p></div>
          <ArrowRight class="service-arrow" aria-hidden="true" />
        </a>
      </section>

      <section class="section intro-section">
        <div class="section-heading"><span class="eyebrow">{{ t.home.servicesLabel }}</span>
          <h2><span v-for="line in t.home.servicesTitle.split('\n')" :key="line">{{ line }}</span></h2></div>
        <div class="section-copy"><p>{{ t.home.servicesIntro }}</p><a href="/business.html"
                                                                      class="arrow-link">{{ t.common.details }}
          <ArrowRight />
        </a></div>
      </section>

      <section class="section positioning-section">
        <div class="position-visual">
          <Network />
          <span>DIGITAL<br />COMMERCE<br />NETWORK</span></div>
        <div class="position-copy"><span class="eyebrow">{{ t.home.positioningLabel }}</span>
          <h2>{{ t.home.positioningTitle }}</h2>
          <p>{{ t.home.positioningText }}</p>
          <ul>
            <li v-for="point in t.home.points" :key="point">
              <CheckCircle />
              {{ point }}
            </li>
          </ul>
        </div>
      </section>

      <section class="section philosophy-teaser">
        <span class="eyebrow">{{ t.home.philosophyLabel }}</span>
        <blockquote>{{ t.home.philosophyTitle }}</blockquote>
        <p>{{ t.home.philosophyText }}</p><a href="/company.html" class="arrow-link">{{ t.common.details }}
        <ArrowRight />
      </a>
      </section>

      <section class="contact-cta">
        <div><h2><span v-for="line in t.home.ctaTitle.split('\n')" :key="line">{{ line }}</span></h2>
          <p>{{ t.home.ctaText }}</p></div>
        <a class="button gold" href="/contact.html">{{ t.common.contact }}
          <ArrowRight />
        </a></section>
    </template>

    <template v-else-if="page === 'business'">
      <section class="page-hero">
        <div><span class="eyebrow on-dark">{{ t.business.eyebrow }}</span>
          <h1>{{ t.business.title }}</h1>
          <p>{{ t.business.intro }}</p></div>
        <Network aria-hidden="true" />
      </section>
      <main class="business-list">
        <section v-for="section in t.business.sections" :id="section.id" :key="section.id" class="business-section">
          <div class="business-number"><span>{{ section.no }}</span>
            <component :is="serviceIcons[section.id]" />
          </div>
          <div class="business-copy"><span class="eyebrow">{{ section.ja }}</span>
            <h2>{{ section.title }}</h2>
            <p>{{ section.text }}</p></div>
          <ul>
            <li v-for="item in section.items" :key="item">
              <CheckCircle />
              {{ item }}
            </li>
          </ul>
        </section>
      </main>
      <section class="contact-cta">
        <div><h2>{{ t.business.ctaTitle }}</h2></div>
        <a class="button gold" href="/contact.html">{{ t.common.contact }}
          <ArrowRight />
        </a></section>
    </template>

    <template v-else-if="page === 'company'">
      <section class="page-hero">
        <div><span class="eyebrow on-dark">{{ t.company.eyebrow }}</span>
          <h1>{{ t.company.title }}</h1>
          <p>{{ t.company.intro }}</p></div>
        <Network aria-hidden="true" />
      </section>
      <main>
        <section class="section company-philosophy"><span class="eyebrow">{{ t.company.philosophyLabel }}</span>
          <h2>{{ t.company.philosophyTitle }}</h2>
          <p>{{ t.company.philosophyText }}</p></section>
        <section class="mission-grid">
          <article><span>{{ t.company.missionTitle }}</span>
            <h3>{{ t.company.mission }}</h3></article>
          <article><span>{{ t.company.visionTitle }}</span>
            <h3>{{ t.company.vision }}</h3></article>
        </section>
        <section class="section values-section">
          <div class="section-heading"><span class="eyebrow">{{ t.company.valuesTitle }}</span>
            <h2>{{ t.company.valuesTitle }}</h2></div>
          <div class="value-grid">
            <article v-for="(value, index) in t.company.values" :key="value.title">
              <component :is="valueIcons[index]" />
              <h3>{{ value.title }}</h3>
              <p>{{ value.text }}</p></article>
          </div>
        </section>
        <section class="section overview-section"><span class="eyebrow">{{ t.company.overviewTitle }}</span>
          <h2>{{ t.company.overviewTitle }}</h2>
          <dl>
            <div v-for="([term, value]) in t.company.overview" :key="term">
              <dt>{{ term }}</dt>
              <dd>{{ value }}</dd>
            </div>
          </dl>
        </section>
      </main>
    </template>

    <template v-else-if="page === 'profile'">
      <section class="page-hero">
        <div><span class="eyebrow on-dark">{{ t.profile.eyebrow }}</span>
          <h1>{{ t.profile.title }}</h1>
          <p>{{ t.profile.intro }}</p></div>
        <Network aria-hidden="true" />
      </section>
      <main>
        <section class="section message-section">
          <div class="message-heading"><span class="eyebrow">MESSAGE</span>
            <h2>{{ t.profile.name }}</h2></div>
          <div class="message-copy"><p v-for="paragraph in t.profile.message" :key="paragraph">{{ paragraph }}</p></div>
        </section>
        <section class="profile-card">
          <div class="profile-monogram"><span>WI</span></div>
          <div><span class="eyebrow">{{ t.profile.profileLabel }}</span>
            <h2>{{ t.profile.profileTitle }}</h2>
            <h3>{{ t.profile.role }}</h3>
            <p>{{ t.profile.bio }}</p></div>
        </section>
        <section class="section personal-section">
          <div><span class="eyebrow">{{ t.profile.personalLabel }}</span>
            <h2>{{ t.profile.personalLabel }}</h2>
            <ul>
              <li v-for="item in t.profile.personal" :key="item">
                <CheckCircle />
                {{ item }}
              </li>
            </ul>
          </div>
          <blockquote><span>{{ t.profile.mottoLabel }}</span>{{ t.profile.motto }}</blockquote>
        </section>
      </main>
    </template>

    <template v-else>
      <section class="page-hero">
        <div><span class="eyebrow on-dark">{{ t.contact.eyebrow }}</span>
          <h1>{{ t.contact.title }}</h1>
          <p>{{ t.contact.intro }}</p></div>
        <Network aria-hidden="true" />
      </section>
      <main class="contact-layout">
        <form class="contact-form" @submit.prevent="submit"><h2>{{ t.contact.formTitle }}</h2>
          <div class="form-row"><label>{{ t.contact.fields.company }}<input name="company" required
                                                                            autocomplete="organization" /></label><label>{{
              t.contact.fields.name
            }}<input name="name" required autocomplete="name" /></label></div>
          <label>{{ t.contact.fields.email }}<input name="email" type="email" required autocomplete="email" /></label>
          <label>{{ t.contact.fields.category }}<select name="category" required>
            <option value="" disabled selected>—</option>
            <option v-for="category in t.contact.categories" :key="category">{{ category }}</option>
          </select></label>
          <label>{{ t.contact.fields.message }}<textarea name="message" rows="7" required /></label>
          <label class="consent"><input type="checkbox" required />{{ t.contact.fields.consent }}</label>
          <button class="button gold" type="submit">{{ t.contact.fields.submit }}
            <Mail />
          </button>
          <p v-if="sent" class="form-status" role="status">{{ t.contact.success }}</p>
        </form>
        <aside class="contact-aside">
          <Mail />
          <span class="eyebrow">EMAIL</span>
          <h2>{{ t.contact.directTitle }}</h2>
          <p>{{ t.contact.directText }}</p><a :href="`mailto:${CONTACT_EMAIL}`">{{
            CONTACT_EMAIL
          }}</a><small>{{ t.contact.note }}</small></aside>
      </main>
    </template>

    <footer class="site-footer">
      <div class="footer-main">
        <a class="brand" href="/index.html" aria-label="Wakyou Trading home"><img src="/assets/wakyou-mark.png"
                                                                                  alt="" /><span><strong>WAKYOU TRADING</strong><small>株式会社和橋商事</small></span></a>
        <nav aria-label="Footer navigation"><a href="/business.html">{{ t.nav.business }}</a><a
            href="/company.html">{{ t.nav.company }}</a><a href="/profile.html">{{ t.nav.profile }}</a><a
            href="/contact.html">{{ t.nav.contact }}</a></nav>
      </div>
      <div class="footer-bottom"><span>© 2026 Wakyou Trading Co., Ltd.</span><a
          :href="`mailto:${CONTACT_EMAIL}`">{{ CONTACT_EMAIL }}</a></div>
    </footer>
  </div>
</template>
