$(function () {

    const ctx1 = $('#chart1');
    const ctx2 = $('#chart2')



    totalOrders = 12
    remainingOrders = 0
    count1 = 0
    count2 = 0
    count3 = 0
    orders.forEach(order => {
        const orderNum = order.order_number
        const savedDate = localStorage.getItem(orderNum)

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

    })



    deliveredOrders = count1 + count2 + count3
    remainingOrders = totalOrders - deliveredOrders






    Chart.defaults.font.size = 20
    Chart.overrides.doughnut.cutout = '55%'


    if (deliveredOrders == 0) {
        new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['Pas de livraisons'],
                datasets: [{
                    data: [1],
                    backgroundColor: [
                        'rgba(0, 0, 0, .2'
                    ],
                    borderColor: 'transparent'
                }]
            },
            options: {
                responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Livraisons par jour'
                }
            }
            }
        });
    } else {
        new Chart(ctx1, {
            type: 'doughnut',
            data: {
                labels: ['26/01/2026', '27/01/2026', '28/01/2026'],
                datasets: [{
                    data: [count1, count2, count3],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)'
                    ],
                    borderColor: '#000'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Livraisons par jour'
                    }
                }
            }
        });
        
    }


    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Livrées', 'Non livrées'],
            datasets: [{
                data: [deliveredOrders, remainingOrders],
                backgroundColor: [
                    'rgb(19, 219, 12)',
                    'rgba(0, 0, 0, .2)'
                ],
                borderColor: 'transparent'
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Total des livrées'
                }
            }
        }
    })

});