<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

let observer: IntersectionObserver | undefined
let frame = 0
let cleanup = () => {}
let videoCleanup = () => {}

onMounted(() => {
  const root = document.querySelector('.sti-home')
  const video = document.querySelector<HTMLVideoElement>('.cinema-video')
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!root) return

  if (video) {
    const skipIntro = () => {
      if (video.duration > 15 && video.currentTime < 15) video.currentTime = 15
    }

    video.addEventListener('loadedmetadata', skipIntro)
    video.addEventListener('canplay', skipIntro)
    video.addEventListener('timeupdate', skipIntro)
    videoCleanup = () => {
      video.removeEventListener('loadedmetadata', skipIntro)
      video.removeEventListener('canplay', skipIntro)
      video.removeEventListener('timeupdate', skipIntro)
    }
    skipIntro()
  }

  root.classList.add('motion-ready')

  if (!reducedMotion) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' })

    root.querySelectorAll('.scroll-reveal').forEach((element) => observer?.observe(element))

    const updateParallax = () => {
      frame = 0
      if (video) video.style.transform = `translate3d(0, ${Math.min(window.scrollY * -0.12, 0)}px, 0) scale(1.18)`
    }

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateParallax)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateParallax()

    cleanup = () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }
})

onBeforeUnmount(() => {
  cleanup()
  videoCleanup()
  observer?.disconnect()
})
</script>

<template>
  <div class="sti-home">
    <section class="cinema-hero" aria-labelledby="hero-title">
      <video class="cinema-video" autoplay loop muted playsinline aria-hidden="true">
        <source src="/950605083-1-208.mp4" type="video/mp4" />
      </video>

      <header class="glass-nav liquid-glass" aria-label="首页导航">
        <a class="glass-brand" href="./" aria-label="SJTU STI Wiki 首页"><span>SJTU STI Wiki</span><sup>∞</sup></a>
        <nav class="glass-links" aria-label="快捷导航">
          <a href="#six-principles">主张</a>
          <a href="#paths">三条路径</a>
          <a href="#home-links-title">行动工具</a>
        </nav>
        <a class="glass-cta liquid-glass" href="#paths">选择我的路径 <span aria-hidden="true">↗</span></a>
      </header>

      <div class="cinema-content">
        <p class="hero-overline">交大科创生存手册</p>
        <h1 id="hero-title" class="animate-fade-rise">Look for and start<br /><em>your own journey</em></h1>
        <p class="hero-copy animate-fade-rise-delay">知道自己在做什么，为什么这么做，以及是否真正愿意继续。</p>
        <div class="hero-actions animate-fade-rise-delay-2">
          <a class="glass-cta liquid-glass glass-cta-large" href="#six-principles">了解我们的主张</a>
          <a class="hero-text-link" href="./draft/开始之前：我是否需要做科创">选择我的路径 <span aria-hidden="true">↓</span></a>
        </div>
      </div>

      <div class="hero-foot" aria-hidden="true"><span>∞</span><span>自觉 · 自知 · 自洽</span><span>SCROLL TO EXPLORE</span></div>
    </section>

    <main>
      <section id="six-principles" class="principles-section section-shell scroll-reveal" aria-labelledby="principles-title">
        <div class="section-heading">
          <p class="section-kicker">A CONTINUOUS CALIBRATION</p>
          <h2 id="principles-title">教育不是筛选，成长不是内卷</h2>
          <p class="section-lead">我们相信，教育不应是让人无限向前，而是学会在现实反馈中反复校准——继续、转向和停止，都应当，也可以是清醒的选择。</p>
        </div>
        <div class="principle-groups scroll-reveal">
          <section class="principle-group" aria-labelledby="principle-awareness">
            <header><span>01 / AWARENESS</span><h3 id="principle-awareness">自觉</h3></header>
            <ol><li><strong>问题意识</strong><p>我正在解决什么真实问题？</p></li><li><strong>主动行动</strong><p>我是否已经产生真实交付，而不只是准备和焦虑？</p></li></ol>
          </section>
          <section class="principle-group principle-self" aria-labelledby="principle-self">
            <header><span>02 / SELF-KNOWLEDGE</span><h3 id="principle-self">自知</h3></header>
            <ol start="3"><li><strong>动机诚实</strong><p>我为什么做，是出于目标与兴趣，还是他人的期待？</p></li><li><strong>边界清醒</strong><p>我愿意投入多少时间、精力和机会成本？</p></li></ol>
          </section>
          <section class="principle-group" aria-labelledby="principle-coherence">
            <header><span>03 / COHERENCE</span><h3 id="principle-coherence">自洽</h3></header>
            <ol start="5"><li><strong>证据校准</strong><p>我的判断是否与事实、反馈和行动结果相符？</p></li><li><strong>选择负责</strong><p>我是否真正愿意继续，也允许自己转向或停止？</p></li></ol>
          </section>
        </div>
        <a class="self-check-link" href="./draft/开始之前：我是否需要做科创">不妨开始你的实践 <span aria-hidden="true">→</span></a>
      </section>

      <section id="paths" class="home-intro section-shell scroll-reveal" aria-labelledby="home-intro-title">
        <div class="section-heading section-heading-wide">
          <p class="section-kicker">CHOOSE BY PURPOSE, NOT PRESTIGE</p>
          <h2 id="home-intro-title">三条路径</h2>
          <p class="section-lead">科研、创赛与创业遵循不同的评价逻辑。先明确目标和约束，再用一次可验证的交付决定下一步。</p>
        </div>
        <div class="path-grid scroll-reveal">
          <a class="path-item path-research" href="./draft/科研路径：从进入实验室到形成学术资产"><span class="path-index">PATH 01 / RESEARCH</span><h3>科研</h3><p>从进入实验室，到形成可复现的研究记录与学术资产。</p><span class="path-link">进入路径 <span aria-hidden="true">→</span></span></a>
          <a class="path-item path-competition" href="./draft/创赛路径：从想法到可评审项目"><span class="path-index">PATH 02 / COMPETITION</span><h3>创赛</h3><p>从一个想法，到有证据、可协作、可评审的完整项目。</p><span class="path-link">进入路径 <span aria-hidden="true">→</span></span></a>
          <a class="path-item path-startup" href="./draft/创业路径：从想法到真实验证"><span class="path-index">PATH 03 / STARTUP</span><h3>创业</h3><p>从技术或需求假设，到真实用户、交付与交易验证。</p><span class="path-link">进入路径 <span aria-hidden="true">→</span></span></a>
        </div>
      </section>

      <section class="home-band section-shell scroll-reveal" aria-labelledby="home-method-title">
        <div class="home-band-copy"><p class="section-kicker">HOW THE WIKI WORKS</p><h2 id="home-method-title">把分散经验变成可核验的公共知识</h2></div>
        <ol class="method-list"><li class="scroll-reveal"><span>事实</span><p>优先引用官方或可核验来源，并记录核验日期。</p></li><li class="scroll-reveal"><span>经验</span><p>保留经历的背景、约束与局限，不把个案包装成规律。</p></li><li class="scroll-reveal"><span>建议</span><p>提炼成下一步动作、判断条件与退出条件。</p></li></ol>
      </section>

      <section class="home-links section-shell scroll-reveal" aria-labelledby="home-links-title">
        <div><p class="section-kicker">WORKBENCH</p><h2 id="home-links-title">现在就能使用的入口</h2></div>
        <nav class="utility-links" aria-label="行动工具"><a class="scroll-reveal" href="./draft/科创通用能力">通用能力 <span>检索、执行、协作与复盘</span><b aria-hidden="true">↗</b></a><a class="scroll-reveal" href="./draft/交大科创资源地图">资源地图 <span>校内资源与官方入口</span><b aria-hidden="true">↗</b></a><a class="scroll-reveal" href="./draft/工具与模板库">工具与模板 <span>清单、工作表与行动骨架</span><b aria-hidden="true">↗</b></a><a class="scroll-reveal" href="./draft/棱镜案例库">案例资料库 <span>经授权、脱敏与核验的过程档案</span><b aria-hidden="true">↗</b></a></nav>
      </section>

      <section class="home-contribute section-shell scroll-reveal" aria-labelledby="home-contribute-title">
        <div><p class="section-kicker">OPEN, WITH RESPONSIBILITY</p><h2 id="home-contribute-title">共同维护，审慎公开</h2><p>GitHub 是公开平台与贡献入口。公开内容须经科协批准；访谈原始材料始终留在科协内部，不进入公开仓库；本页面设计和内容经过ai润色。</p></div>
        <a class="contribute-link" href="https://github.com/RRRealCedric/SJTU-STI-Wiki" target="_blank" rel="noreferrer">前往 GitHub <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  </div>
</template>
