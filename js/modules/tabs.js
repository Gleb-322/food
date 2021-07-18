function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
    // Tabs
    const tabContent = document.querySelectorAll(tabsContentSelector),
    tabParent = document.querySelector(tabsParentSelector),
    tabs = document.querySelectorAll(tabsSelector);

    function hideTabContent () {
        tabContent.forEach(item => {
            // item.style.display = 'none'; этот вариант не используется
            item.classList.add('hide');
            item.classList.remove('show' , 'fade'); /* fade - это анимация */
        });

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });

    }

    function showTabContent (i = 0) {
        // tabContent[i].style.display = 'block'; этот вариант не используется
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((elem , i) => {
                if (elem == target) {
                    hideTabContent ();
                    showTabContent(i);
                }
            });
        }

    });
}

export default tabs;