class Calendar{
    constructor(id){
        this.cells = [];
        this.selectedDate = null;
        this.currentMonth = moment();
        this.elCalendar = document.getElementById(id);
        this.showTemplate();
        this.elGridBody = this.elCalendar.querySelector('.grid-body');
        this.elMonthName = this.elCalendar.querySelector('.month-name');
        this.showCells();
    }

    showTemplate(){
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEvenetListenerToControls();
    }

    getTemplate(){
        let template = `
        <div class="calendar-header">
                <button type="button" class="control control-prev">&lt;</button>
                <span class="month-name">ene 2021</span>
                <button type="button" class="control control-next">&gt;</button>
            </div>
            <div class="calendar-body">
                <div class="grid">
                    <div class="grid-header">
                        <span class="grid-cell grid-cell-gh">Lun</span>
                        <span class="grid-cell grid-cell-gh">Mar</span>
                        <span class="grid-cell grid-cell-gh">Mié</span>
                        <span class="grid-cell grid-cell-gh">Jue</span>
                        <span class="grid-cell grid-cell-gh">Vie</span>
                        <span class="grid-cell grid-cell-gh">Sáb</span>
                        <span class="grid-cell grid-cell-gh">Dom</span>
                    </div>
                    <div class="grid-body">
                    </div>
                </div>
            </div>
        `; 
    return template;
    }

    addEvenetListenerToControls(){
        let elControls = this.elCalendar.querySelectorAll('.control');
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                let elTarget = e.target;
                if(elTarget.classList.contains('control-next')){
                    this.changeMonth(true);
                }
                else{
                    this.changeMonth(false);
                }
                this.showCells();
            });
        });
    }

    changeMonth(next = true){
        if(next){
            this.currentMonth.add(1, 'months');
        }
        else{
            this.currentMonth.subtract(1, 'months');
        }
    }

    showCells(){
        this.cells = this.generateDates(this.currentMonth);
        if(this.cells === null){
            console.error('Invalid DataTypes');
            return;
        }

        // Show calendar
        this.elGridBody.innerHTML = '';
        let templateCells = '';
        let disabledClass = '';
        for (let i=0; i<this.cells.length; i++){
            disabledClass = '';

            // Validate disable cells
            if(!this.cells[i].isInCurrentMonth){
                disabledClass = 'grid-cell-disabled';
            }
            templateCells += `
                <a hover:text-decoration:none href="/sales/${this.cells[i].date.date()}/${this.currentMonth.format('M')}/${this.currentMonth.format('Y')}" class="grid-cell grid-cell-gd ${disabledClass}">
                    <span class="grid-cell grid-cell-gd ${disabledClass}" data-cell-id = "${i}">                   
                        ${this.cells[i].date.date()}  
                    </span>
                </a> 
            `;
        }
        this.elMonthName.innerHTML = this.currentMonth.format('MMM YYYY');
        this.elGridBody.innerHTML = templateCells;
        //this.addEvenetListenerToCells();
    }

    generateDates(monthToShow = moment()){
        if (!moment.isMoment(monthToShow)){
            return null;
        }
        let dateStart = moment(monthToShow).startOf('month'); 
        let dateEnd = moment(monthToShow).endOf('month');
        let cells = [];

        // Find first date to show
        while(dateStart.day() !== 1){
            dateStart.subtract(1, 'days');
        }

        // Find last date to show
        while(dateEnd.day() !== 0){
            dateEnd.add(1, 'days');
        }
        
        do{
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth: dateStart.month() === monthToShow.month() 
            });
            dateStart.add(1, 'days');
        } while(dateStart.isSameOrBefore(dateEnd));
        
        return cells;
    }

    /*addEvenetListenerToCells(){
        let elCells = this.elCalendar.querySelectorAll('.grid-cell-gd');
        elCells.forEach(elCells =>{
            elCells.addEventListener('click', e =>{
                let elTarget = e.target;

                // Disabled cells can't be selected 
                if(elTarget.classList.contains('grid-cell-disabled')){
                    return;
                }
                let selectedCell = this.elGridBody.querySelector('.grid-cell-selected');
                
                // Remove class "grid-cell-selected" every time
                if(selectedCell){
                    selectedCell.classList.remove('grid-cell-selected');
                }
                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                elTarget.classList.add('grid-cell-selected');
                this.elCalendar.dispatchEvent(new Event('change'));
            });
        });
    }
    */

    getElement(){
        return this.elCalendar;
    }

    value(){
        return this.selectedDate;
    }
}

let calendar = new Calendar('calendar');
calendar.getElement().addEventListener('change', e => {
    
});
