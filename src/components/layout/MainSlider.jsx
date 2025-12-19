import "./MainSlider.scss"
import React from 'react'
import {useData} from "/src/providers/DataProvider.jsx"
import Section from "/src/components/layout/Section.jsx"
import {useWindow} from "/src/providers/WindowProvider.jsx"
import Chatbot from "/src/components/widgets/Chatbot.jsx"

function MainSlider() {
    const {getSections} = useData()
    const {hasFooterOffset} = useWindow()

    const sections = getSections()
    console.log("Sections Data:",sections)
    const addOnClassList = hasFooterOffset() ? `sections-slider-offset-bottom ` : ``

    return (
        <div className={`sections-slider highlight-scrollbar ${addOnClassList}`}>
          
            {sections.map((section, key) => {
                return (
                    <Section key={key} section={section}/>
                )
            })}
            
            <Chatbot />
             
        </div>
    )
}

export default MainSlider