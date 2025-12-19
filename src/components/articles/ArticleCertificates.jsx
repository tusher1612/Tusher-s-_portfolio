import React from 'react'
import Article from '/src/components/wrappers/Article.jsx'
import CertificateBanner from '/src/components/generic/CertificateBanner.jsx'
import { useParser } from '/src/helpers/parser.js'
import { useLanguage } from '/src/providers/LanguageProvider.jsx'

function ArticleCertificates({ data }) {
    const { selectedLanguageId } = useLanguage()
    const parser = useParser()

    const parsedData = parser.parseArticleData(data, [])
    const items = parsedData.items || []

    const processedItems = items.map(item => ({
        img: item.img,
        title: item.locales?.[selectedLanguageId]?.title || '',
        dateInterval: item.locales?.[selectedLanguageId]?.dateInterval || '',
        text: item.locales?.[selectedLanguageId]?.text || ''
    }))

    return (
        <Article className="article-certificates" title={parsedData.title}>
            <div className="certificates-container">
                {processedItems.map((certificate, index) => (
                    <CertificateBanner key={index} certificate={certificate} />
                ))}
            </div>
        </Article>
    )
}

export default ArticleCertificates