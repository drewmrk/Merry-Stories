<template>
  <div class="page">
    <Hero :size="HeroSize.half" title="FAQ" class="hero" />
    <div class="wrapper">
      <div v-for="item in faqItems" :key="item.question" class="faq-section">
        <p class="faq-section--question">Q: {{ item.question }}</p>
        <p class="faq-section--answer">A: {{ item.answer }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Hero, { HeroSize } from '@/components/Hero'

  export default {
    name: 'FAQ',
    components: {
      Hero
    },
    data() {
      return {
        HeroSize,
        faqItems: [
          {
            question: 'Why is there only the ability to login with Google?',
            answer:
              'We want to be able to hold people accountable for what they write in the event of any malcontent.'
          },
          {
            question: 'How do I like, comment, etc.?',
            answer:
              'You cant! Merry Stories is a website to read, and write cheerful stories. Nothing more, nothing less.'
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hero {
    background-color: $color-warning;
  }

  .wrapper {
    @include mobile {
      padding: 5px 15px;
    }
    @include desktop {
      padding: 10px 20px;
    }
    @include flex(column);
    align-items: center;
    margin: 20px 0;
    .faq-section {
      @include desktop {
        max-width: 50%;
      }
      margin: 10px 0;
      &--question,
      &--answer {
        @include mobile {
          font-size: 1.25em;
        }
        @include desktop {
          font-size: 1.35em;
        }
        line-height: 170%;
      }
      &--question {
        font-weight: 600;
      }
    }
  }
</style>
