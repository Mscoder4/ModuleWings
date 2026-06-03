document.addEventListener('DOMContentLoaded', function () {
    var todayInput = document.getElementById('invoice_date');
    var dueInput = document.getElementById('due_date');
    var userSelect = document.getElementById('user_id');
    var orderSelect = document.getElementById('order_id');
    var subjectInput = document.getElementById('subject');
    var remarkInput = document.getElementById('remark');
    var advanceInput = document.getElementById('advance');
    var discountInput = document.getElementById('discount');
    var itemsBody = document.getElementById('items_body');
    var addItemBtn = document.getElementById('add_item');

    var previewFrame = document.getElementById('invoice_preview_frame');
    var tplDoc = null;
    var tplClient, tplInvDate, tplInvCode, tplSubject, tplItemsBody, tplSubtotal, tplTotal, tplDueDate, tplTotalDue;
    var tplAdvanceRow, tplDiscountRow, tplAdvance, tplDiscount;

    // set today's date for invoice date (display only)
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var dd = String(today.getDate()).padStart(2, '0');
    var todayStr = yyyy + '-' + mm + '-' + dd;
    if (todayInput) {
        todayInput.value = todayStr;
    }

    function initTemplateRefs() {
        if (!previewFrame) return;
        tplDoc = previewFrame.contentDocument || previewFrame.contentWindow.document;
        if (!tplDoc) return;
        tplClient = tplDoc.getElementById('tpl_client_name');
        tplInvDate = tplDoc.getElementById('tpl_invoice_date');
        tplInvCode = tplDoc.getElementById('tpl_invoice_code');
        tplSubject = tplDoc.getElementById('tpl_subject');
        tplItemsBody = tplDoc.getElementById('tpl_items_body');
        tplSubtotal = tplDoc.getElementById('tpl_subtotal');
        tplTotal = tplDoc.getElementById('tpl_total');
        tplDueDate = tplDoc.getElementById('tpl_due_date');
        tplTotalDue = tplDoc.getElementById('tpl_total_due');
        tplAdvanceRow = tplDoc.getElementById('tpl_advance_row');
        tplDiscountRow = tplDoc.getElementById('tpl_discount_row');
        tplAdvance = tplDoc.getElementById('tpl_advance');
        tplDiscount = tplDoc.getElementById('tpl_discount');
    }

    function formatPrettyDate(iso) {
        if (!iso) return '—';
        var d = new Date(iso);
        if (isNaN(d.getTime())) return iso;
        var day = String(d.getDate()).padStart(2, '0');
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return day + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
    }

    function formatAmount(n) {
        return n.toLocaleString('en-IN', {minimumFractionDigits: 0, maximumFractionDigits: 0});
    }

    function filterOrders() {
        if (!userSelect || !orderSelect) return;
        var userId = userSelect.value;
        Array.prototype.forEach.call(orderSelect.options, function (opt) {
            if (!opt.value) {
                opt.hidden = false;
                return;
            }
            var forUser = opt.getAttribute('data-user-id');
            opt.hidden = userId && forUser !== userId;
        });
        // reset selection
        orderSelect.value = '';
        updatePreview();
    }

    function updatePreview() {
        if (!tplDoc) return;

        if (tplClient && userSelect) {
            tplClient.textContent = userSelect.options[userSelect.selectedIndex]?.text || '{{CLIENT_NAME}}';
        }
        if (tplInvCode && userSelect) {
            var initials = userSelect.selectedOptions[0]?.getAttribute('data-initials') || '--';
            tplInvCode.textContent = initials + '0000';
        }
        if (tplInvDate && todayInput) {
            tplInvDate.textContent = formatPrettyDate(todayInput.value);
        }
        if (tplSubject && subjectInput) {
            tplSubject.textContent = subjectInput.value || '{{SUBJECT}}';
        }
        if (tplDueDate && dueInput) {
            tplDueDate.textContent = formatPrettyDate(dueInput.value);
        }

        if (orderSelect && tplDoc) {
            var code = orderSelect.selectedOptions[0]?.getAttribute('data-order-code') || '—';
            var orderCell = tplDoc.getElementById('tpl_order_code');
            if (orderCell) orderCell.textContent = code;
        }

        // compute subtotal and total from items + mirror into template table
        var subtotal = 0;
        if (tplItemsBody) {
            tplItemsBody.innerHTML = '';
        }
        var index = 1;
        if (itemsBody) {
            Array.prototype.forEach.call(itemsBody.querySelectorAll('tr'), function (row) {
                var qty = parseFloat(row.querySelector('.item-qty')?.value || '0');
                var price = parseFloat(row.querySelector('.item-price')?.value || '0');
                var name = (row.querySelector('.item-name')?.value || '').trim();
                if (!name || isNaN(qty) || isNaN(price) || qty <= 0 || price < 0) return;
                var lineTotal = qty * price;
                subtotal += lineTotal;

                if (tplItemsBody && tplDoc) {
                    var tr = tplDoc.createElement('tr');

                    var tdIdx = tplDoc.createElement('td');
                    tdIdx.className = 'col-hash';
                    tdIdx.textContent = String(index++);
                    tr.appendChild(tdIdx);

                    var tdDesc = tplDoc.createElement('td');
                    tdDesc.className = 'col-desc';
                    tdDesc.textContent = name;
                    tr.appendChild(tdDesc);

                    var tdQty = tplDoc.createElement('td');
                    tdQty.className = 'col-qty';
                    tdQty.textContent = String(qty);
                    tr.appendChild(tdQty);

                    var tdRate = tplDoc.createElement('td');
                    tdRate.className = 'col-rate';
                    tdRate.textContent = formatAmount(price);
                    tr.appendChild(tdRate);

                    var tdAmt = tplDoc.createElement('td');
                    tdAmt.className = 'col-amount';
                    tdAmt.textContent = formatAmount(lineTotal);
                    tr.appendChild(tdAmt);

                    tplItemsBody.appendChild(tr);
                }
            });
        }
        if (tplSubtotal) {
            tplSubtotal.textContent = formatAmount(subtotal);
        }
        var adv = parseFloat(advanceInput?.value || '0');
        var disc = parseFloat(discountInput?.value || '0');
        if (isNaN(adv)) adv = 0;
        if (isNaN(disc)) disc = 0;
        if (tplAdvanceRow) {
            tplAdvanceRow.style.display = adv > 0 ? '' : 'none';
        }
        if (tplDiscountRow) {
            tplDiscountRow.style.display = disc > 0 ? '' : 'none';
        }
        if (tplAdvance) {
            tplAdvance.textContent = adv > 0 ? formatAmount(adv) : '';
        }
        if (tplDiscount) {
            tplDiscount.textContent = disc > 0 ? formatAmount(disc) : '';
        }
        var total = subtotal - adv - disc;
        if (total < 0) total = 0;
        var totalStr = formatAmount(total);
        if (tplTotal) {
            tplTotal.textContent = totalStr;
        }
        if (tplTotalDue) {
            tplTotalDue.textContent = totalStr;
        }
    }

    if (userSelect) {
        userSelect.addEventListener('change', filterOrders);
    }
    if (orderSelect) {
        orderSelect.addEventListener('change', updatePreview);
    }
    if (dueInput) {
        dueInput.addEventListener('input', updatePreview);
    }
    if (subjectInput) {
        subjectInput.addEventListener('input', updatePreview);
    }
    if (remarkInput) {
        remarkInput.addEventListener('input', updatePreview);
    }
    if (advanceInput) {
        advanceInput.addEventListener('input', updatePreview);
    }
    if (discountInput) {
        discountInput.addEventListener('input', updatePreview);
    }

    // items table: add row & recalc per-row total
    function recalcRow(row) {
        var qtyInput = row.querySelector('.item-qty');
        var priceInput = row.querySelector('.item-price');
        var totalInput = row.querySelector('.item-total');
        if (!qtyInput || !priceInput || !totalInput) return;
        var q = parseFloat(qtyInput.value || '0');
        var p = parseFloat(priceInput.value || '0');
        if (isNaN(q)) q = 0;
        if (isNaN(p)) p = 0;
        var lt = q * p;
        totalInput.value = lt ? lt.toFixed(2) : '';
    }

    if (itemsBody) {
        itemsBody.addEventListener('input', function (e) {
            var row = e.target.closest('tr');
            if (!row) return;
            if (e.target.classList.contains('item-qty') || e.target.classList.contains('item-price')) {
                recalcRow(row);
                updatePreview();
            }
        });
    }

    if (addItemBtn && itemsBody) {
        addItemBtn.addEventListener('click', function (e) {
            e.preventDefault();
            var rows = itemsBody.querySelectorAll('tr');
            var last = rows[rows.length - 1];
            var clone = last ? last.cloneNode(true) : null;
            if (!clone) return;
            Array.prototype.forEach.call(clone.querySelectorAll('input'), function (inp) {
                inp.value = '';
            });
            itemsBody.appendChild(clone);
            updatePreview();
        });
    }

    if (previewFrame) {
        previewFrame.addEventListener('load', function () {
            initTemplateRefs();
            updatePreview();
        });
    } else {
        updatePreview();
    }
});

