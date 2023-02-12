const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
document.getElementById("gcoe").innerHTML = localStorage.getItem("gCO2Value");
document.getElementById("mbTotalValue").innerHTML = localStorage.getItem("mbTotalValue");
document.getElementById("kWhTotalValue").innerHTML = localStorage.getItem("kWhTotalValue");

const defaultCarbonIntensityFactorIngCO2PerKWh = 519;
const kWhPerByteDataCenter = 0.000000000072;
const kWhPerByteNetwork = 0.000000000152;

							
function buildTable(){
	var x = JSON.parse(localStorage.getItem("myEmissionHistory"));
	var data = JSON.parse(x[0]);
	var web = [];
	var coE = [];
	var color = [];
	for(const o in data) {
		web.push(o) ;
		const kWhDataCenterTotal = data[o] * kWhPerByteDataCenter;
		const GESDataCenterTotal = kWhDataCenterTotal * defaultCarbonIntensityFactorIngCO2PerKWh;
	  
		const kWhNetworkTotal = data[o] * kWhPerByteNetwork;
		const GESNetworkTotal = kWhNetworkTotal * defaultCarbonIntensityFactorIngCO2PerKWh;
	  
		const gCO2Total = Math.round(GESDataCenterTotal + GESNetworkTotal);	  
		coE.push(gCO2Total);
	}

	const sortedStats = [];
	for (var i = web.length - 1; i >= 0; i--) {
		sortedStats.push({ 'web': web[i], 'coE': coE[i] });
	}
	sortedStats.sort(function(a, b) {
	    return a.coE < b.coE ? 1 : a.coE > b.coE ? -1 : 0
	});

	for(var i = 0; i < web.length; i++) {
		if(sortedStats[i].coE < 20){
			color.push('green');
		}else if(sortedStats[i].coE < 50){
			color.push('semigreen');
		}else{
			color.push('nongreen');
		}
	}

	var table = document.getElementById('footprintTable')
	for (var i = 0; i < web.length; i++){
		var row = `<tr> 
						<td><p>${sortedStats[i].web}</p></td>
						<td>${sortedStats[i].coE}g</td>
						<td><span class="status ${color[i]}">${color[i]}</span></td>
				  </tr>`
		table.innerHTML += row
	}
}
buildTable()

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})