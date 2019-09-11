const FeedbackSurvey = {
    isDisplayed: (state) => { 

        const surveyBtn = document.getElementById('surveyContent');
        const surveyContent = document.querySelector('.mopinion-survey-content');
        const surveyMask = document.getElementById('surveyMask');

        if (state) {
            const blockDisplay = "block";
            if (surveyBtn) { 
                surveyBtn.style.display = blockDisplay;
            }
            if (surveyContent) { 
                surveyContent.style.display = blockDisplay;
            }
            if (surveyMask) { 
                surveyMask.style.display = blockDisplay;
            }
        } else { 
            const noneDisplay = "none";
            if (surveyBtn) { 
                surveyBtn.style.display = noneDisplay;
            }
            if (surveyContent) { 
                surveyContent.style.display = noneDisplay;
            }
            if (surveyMask) { 
                surveyMask.style.display = noneDisplay;
            }
        }
    }
}

export default FeedbackSurvey;