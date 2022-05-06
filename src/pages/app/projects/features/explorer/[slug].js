import React, { useContext } from 'react'

import DashboardLayout from '../../../../../components/app/DasboardLayout'
import ExplorerLayout from '../../../../../page-components/feature-explorer/ExplorerLayout'
import { ExplorerWrapper, useExplorerContext } from '../../../../../context/explorer'


const Index = () => {
  return (
    <ExplorerWrapper>
      <DashboardLayout>
        <ExplorerLayout>

        </ExplorerLayout>
      </DashboardLayout>
    </ExplorerWrapper>
  )
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'facebook-headlines' } },
      { params: { slug: 'paragraph-writer' } },
      { params: { slug: 'paragraph-rewriter' } },
      { params: { slug: 'facebook-primary-text' } },
      { params: { slug: 'facebook-headlines' } },
      { params: { slug: 'google-ads-headlines' } },
      { params: { slug: 'google-ads-description' } },
      { params: { slug: 'blog-titles' } },
      { params: { slug: 'blog-ideas' } },
      { params: { slug: 'blog-intros' } },
      { params: { slug: 'blog-outlines' } },
      { params: { slug: 'video-titles' } },
      { params: { slug: 'video-descriptions' } },
      { params: { slug: 'quora-answers' } },
      { params: { slug: 'rewrite-with-keyword' } },
      { params: { slug: 'text-summarizer-tl-dr-' } },
      { params: { slug: 'grammar-rewriter' } },
      { params: { slug: 'essay-intros' } },
      { params: { slug: 'essay-outlines' } },
      { params: { slug: 'ecommerce-product-descriptions' } },
      { params: { slug: 'ecommerce-category-descriptions' } },
      { params: { slug: 'ecommerce-product-names' } },
      { params: { slug: 'product-descriptions' } },
      { params: { slug: 'value-proposition' } },
      { params: { slug: 'feature-to-benefit' } },
      { params: { slug: 'startup-name-generator' } },
      { params: { slug: 'video-script-intros' } },
      { params: { slug: 'video-script-outlines' } },
      { params: { slug: 'video-script-section' } },
      { params: { slug: 'follow-up-email' } },
      { params: { slug: 'welcome-email' } },
      { params: { slug: 'cancellation-email' } },
      { params: { slug: 'confirmation-email' } },
      { params: { slug: 'email-subject-lines' } },
      { params: { slug: 'website-headlines' } },
      { params: { slug: 'website-subheaders' } },
      { params: { slug: 'meta-titles-url-' } },
      { params: { slug: 'meta-descriptions' } },
      { params: { slug: 'meta-descriptions-url-' } },
      { params: { slug: 'faqs' } },
      { params: { slug: 'faq-answers' } },
      { params: { slug: 'pain-agitate-solution' } },
      { params: { slug: 'aida-formula' } },
      { params: { slug: 'quest-formula' } },
      { params: { slug: 'testimonials-reviews' } },
      { params: { slug: 'call-to-action' } },
      { params: { slug: 'about-us' } },
      { params: { slug: 'backlinks' } },
    ],
    fallback: true,
  }
}

export async function getStaticProps() {

  return {
    props: {

    }
  }
}
Index.auth = true
export default Index