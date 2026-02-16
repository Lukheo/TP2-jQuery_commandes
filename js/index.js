$(function () {

    /* Sélection des éléments */
    const ordersContainer = $('#orders-container');
    const dateInput = $('#datepicker');
    const progressbar = $('#progressbar');
    const progressbarLabel = $('.progressbar-label');
    const dateRange = $('#slider-range');
    const dates = $('#dates');
    const ctx1 = $('#chart1');
    const ctx2 = $('#chart2')
    const audioElement = new Audio("resources/creatorshome-pop-cartoon-328167.mp3");

    let count1 = $('#delivery1').children().length
    let count2 = $('#delivery2').children().length
    let count3 = $('#delivery3').children().length
    let counts = [count1, count2, count3]

    let totalOrders = orders.length
    let percentOrders = Math.round(100 - 100 * ($("#orders-container").children().length / totalOrders))
    let remainingOrders
    let deliveredOrders


    /* Chargement des commandes */
    orders.forEach(order => {
        ordersContainer.append(`
            <div class="order text-primary-emphasis d-flex flex-column p-3 gap-3 justify-content-center rounded border bg-white" style="width:300px; height:263.812px">
                <div><span class="bold">N° commande: </span><span class="order-num">${order.order_number}</span></div>
                <div><span class="bold">Date commande: </span><span class="order-date">${order.order_date}</span></div>
                <div><span class="bold">Date de livraison: </span><span class="delivery-date"></span></div>
                <div><span class="bold">Prix: </span>${order.price} €</div>
                <div><span class="bold">Adresse: </span>${order.delivery_address} [<span class="coords1">${order.coords[0]}</span>,<span class="coords2">${order.coords[1]}</span>]</div>
            </div>
        `);
    });

    /* Rendre les commandes draggable */
    $(".order").draggable({ connectToSortable: ".droppable", revert: "invalid" })

    /* Initialiser l'accordéon */
    $("#accordion").accordion({ collapsible: true, heightStyle: "content" })
    /* Initialiser les zone droppable */
    $(".droppable").droppable().sortable({
        connectWith: ".droppable",
        receive: function (event, ui) {
            percentOrders = Math.round(100 - 100 * ($("#orders-container").children().length / totalOrders))
            remainingOrders = $("#orders-container").children().length
            deliveredOrders = totalOrders - remainingOrders
            count1 = $("#delivery1").children().length
            count2 = $('#delivery2').children().length
            count3 = $('#delivery3').children().length
            counts = [count1, count2, count3]

            progressbar.progressbar({ value: percentOrders })
            $(ui.item[0]).find(".delivery-date").text(event.target.dataset.date || "")
            let cmd = ($(ui.item[0]).find(".order-num").text());
            if ($(ui.item[0]).find(".delivery-date").text() != "") {

                let delDate = ($(ui.item[0]).find(".delivery-date").html());
                let coords = [($(ui.item[0]).find(".coords1").text()),($(ui.item[0]).find(".coords2").text())]
                console.log(coords);
                
                console.log(cmd + " " + delDate);
                localStorage.setItem(cmd, delDate)
                localStorage.setItem(`${cmd}-lat`, ($(ui.item[0]).find(".coords1").text()))
                localStorage.setItem(`${cmd}-lon`, ($(ui.item[0]).find(".coords2").text()))
            } else {
                localStorage.removeItem(cmd)
            }

        }
    })

    /* Initialisation de la barre de progression */
    progressbar.progressbar({
        value: 0,
        change: function () {
            percentOrders = Math.round(100 - 100 * ($("#orders-container").children().length / totalOrders))
            progressbarLabel.text(percentOrders + "%")
        }, complete: function () {
            progressbarLabel.text("Complété")
            audioElement.play()
        }
    })

    $(".order").each(function () {
        const orderNum = $(this).find(".order-num").text();
        const savedDate = localStorage.getItem(orderNum);

        if (savedDate) {
            // find matching delivery container by data-date
            const target = $(`.droppable[data-date="${savedDate}"]`);

            switch (savedDate) {
                case '26/01/2026':
                    count1 += 1
                    break
                case '27/01/2026':
                    count2 += 1
                    break
                case '28/01/2026':
                    count3 += 1
                    break
            }

            if (target.length) {
                $(this).appendTo(target);
                $(this).find(".delivery-date").text(savedDate);
            }
            deliveredOrders = count1 + count2 + count3
            remainingOrders = totalOrders - deliveredOrders
            percentOrders = Math.round(100 - 100 * (remainingOrders / totalOrders));
            progressbar.progressbar({ value: percentOrders });
        }
    });




    dateRange.slider({
        range: true,
        min: 0,
        max: 5,
        values: [0, 5],
        slide: function (event, ui) {
            const dateBase = 12;
            const dateRange = [new Date(2026, 0, dateBase + ui.values[0]).toLocaleDateString("fr-FR"), new Date(2026, 0, dateBase + ui.values[1]).toLocaleDateString("fr-FR")]
            dates.html(`Du <b>${dateRange[0]}</b> au <b>${dateRange[1]}</b>`);
            $("#orders-container .order").each(function () {
                const orderDate = $(this).find(".order-date").text()
                if (dateRange[0] <= orderDate && dateRange[1] >= orderDate) {
                    $(this).removeClass("d-none")
                } else {
                    $(this).addClass("d-none")
                }
            })
        }
    })

});