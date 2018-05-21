$(document).ready(function(){
    $(function(){
      $("#field-bik-add").mask("999999999");
      $("#field-bik-upd").mask("999999999");
    });

    $('.container-form-add').addClass('unShowEl');
    $('.container-form-upd').addClass('unShowEl');
    $('.box-add-upd').addClass('unShowEl');
    $('.filters-search-pnl').addClass('unShowEl');
    $('.box-view').addClass('unShowEl');
    $('#btn-upd').addClass('disabled');
    $('#btn-del').addClass('disabled');
    $('#btn-view').addClass('disabled');

    var bikBankCurRow = "";
    var nameBankCurRow = "";
    var infoBankCurRow = "";
    var dateBankCurRow = "";
    var idBankCurRow = "";

    var flagShowUpd = false;
    var flagShowAdd = false;
    $('.button-add').click(function(){
        if(!flagShowAdd){
            $('.container-form-add').addClass('showEl');
            $('.container-form-add').removeClass('unShowEl');
            $('.box-add-upd').addClass('showEl');
            $('.box-add-upd').removeClass('unShowEl');
            $('.container-form-upd').removeClass('showEl');
            $('.container-form-upd').addClass('unShowEl');
        } else {
            $('.container-form-add').removeClass('showEl');
            $('.container-form-add').addClass('unShowEl');
            $('.box-add-upd').removeClass('showEl');
            $('.box-add-upd').addClass('unShowEl');
            $('.container-form-upd').addClass('showEl');
            $('.container-form-upd').removeClass('unShowEl');
        }
        flagShowUpd = false;
        flagShowAdd = !flagShowAdd;
    });

    $('.button-upd').click(function(){
        if( !$(".button-upd").hasClass("disabled")){
            if(!flagShowUpd){
                $('.container-form-upd').addClass('showEl');
                $('.container-form-upd').removeClass('unShowEl');
                $('.box-add-upd').addClass('showEl');
                $('.box-add-upd').removeClass('unShowEl')
                $('.container-form-add').removeClass('showEl');
                $('.container-form-add').addClass('unShowEl');

            } else {
                $('.container-form-upd').removeClass('showEl');
                $('.container-form-upd').addClass('unShowEl');
                $('.box-add-upd').removeClass('showEl');
                $('.box-add-upd').addClass('unShowEl')
                $('.container-form-add').addClass('showEl');
                $('.container-form-add').removeClass('unShowEl');
            }
            flagShowAdd = false;
            flagShowUpd = !flagShowUpd
        }
    });

    $('#btn-cancel-add-bank').click(function(){
        $('.container-form-add').removeClass('showEl');
        $('.container-form-add').addClass('unShowEl');
        $('.box-add-upd').removeClass('showEl');
        $('.box-add-upd').addClass('unShowEl')
    });

    $('#btn-cancel-upd-bank').click(function(){
        $('.container-form-upd').removeClass('showEl');
        $('.container-form-upd').addClass('unShowEl');
        $('.box-add-upd').removeClass('showEl');
        $('.box-add-upd').addClass('unShowEl')
    });

    var flagShowFilter = false;
    $('#btn-search').click(function(){
        if(!flagShowFilter){
            $('.filters-search-pnl').removeClass('unShowEl');
            $('.filters-search-pnl').addClass('showEl');
        } else {
            $('.filters-search-pnl').addClass('unShowEl');
            $('.filters-search-pnl').removeClass('showEl');
        }
        flagShowFilter = !flagShowFilter;
    });

    var flagShowView = false;
    $('#btn-view').click(function(){
        if( !$("#btn-view").hasClass("disabled")){
            if(!flagShowView){
                $('.box-view').removeClass('unShowEl');
                $('.box-view').addClass('showEl');
            } else {
                $('.box-view').addClass('unShowEl');
                $('.box-view').removeClass('showEl');
            }
            flagShowView = !flagShowView;
        }
    });
    viewInfoBank();
    onFilter();


});

function getInfoUpdate(){
    $('#field-bik-upd').val(bikBankCurRow);
    $('#field-name-upd').val(nameBankCurRow);
    $('#field-cornumber-upd').val(infoBankCurRow);
    $('#field-adress-upd').val(dateBankCurRow);
    $('#field-id-upd').val(idBankCurRow);
}

// Для просмотра и сохранения данных строки
function viewInfoBank(){
    var table = document.getElementById('table-banks');
    var row = table.getElementsByTagName('tr');
    for (var i = 0; i < row.length; i++) {
        row[i].onclick = function (e) {
            e = e || event;
            var currentTr = e.target.parentNode;
            var currentTd = currentTr.getElementsByTagName('td');
            //сохраняем данные выбранной записи
            bikBankCurRow = currentTd.namedItem("bikBank").innerHTML;
            nameBankCurRow = currentTd.namedItem("nameBank").innerHTML;
            infoBankCurRow = currentTd.namedItem("cornumberBank").innerHTML;
            dateBankCurRow = currentTd.namedItem("adressBank").innerHTML;
            idBankCurRow = currentTd.namedItem("idBank").innerHTML;
            //поля для апдейта записи
            document.getElementById('field-bik-view').innerHTML = bikBankCurRow;
            document.getElementById('field-name-view').innerHTML = nameBankCurRow;
            document.getElementById('field-cornumber-view').innerHTML = infoBankCurRow;
            document.getElementById('field-adress-view').innerHTML = dateBankCurRow;
            //выделить строку
            $('tr').removeClass('selectedRow');
            $(this).addClass('selectedRow');
            getInfoUpdate();
            $('#btn-upd').removeClass('disabled');
            $('#btn-del').removeClass('disabled');
            $('#btn-view').removeClass('disabled');
        };
    }
}

//Add bank
$(document).ready(function () {
    var form = $('#form-add-bank');
    var addSubmit = $('#btn-submit-add-bank');

    form.on('submit', function(e) {
        e.preventDefault();
        var data = {};
        var csrf_token = $('#form-add-bank [name="csrfmiddlewaretoken"]').val();
        data["csrfmiddlewaretoken"] = csrf_token;
        data["bik"] = $('#field-bik-add').val();
        data["name"] = $('#field-name-add').val();
        data["cornumber"] = $('#field-cornumber-add').val();
        data["adress"] = $('#field-adress-add').val();
        var url = form.attr("action");
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            cache: false,
            success: function(data){
                console.log("succesful add");
                window.location.replace("/");
            },
            error : function(){
                console.log("error");
            }
       });
    });
});

//Update bank
$(document).ready(function () {
    var form = $('#form-upd-bank');
    var updSubmit = $('#btn-cancel-upd-bank');

    form.on('submit', function(e) {

            e.preventDefault();
            var data = {};
            var csrf_token = $('#form-upd-bank [name="csrfmiddlewaretoken"]').val();
            data["csrfmiddlewaretoken"] = csrf_token;
            data["idBank"] = idBankCurRow;
            data["nameBank"] = nameBankCurRow;
            data["bik"] = $('#field-bik-upd').val();
            data["name"] = $('#field-name-upd').val();
            data["cornumber"] = $('#field-cornumber-upd').val();
            data["adress"] = $('#field-adress-upd').val();
            var url = form.attr("action");
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                cache: false,
                success: function(data){
                    console.log("succesful update");
                    window.location.replace("/");
                },
                error : function(){
                    console.log("error");
                }
           });

    });
});

//Delete bank
$(document).ready(function () {
    var delBtn = $('#btn-del');
    var url = delBtn.attr("action");
    delBtn.click( function(e) {
        if(confirm("Удалить выбранную запись?")){
            var data = {};
            var csrf_token = $('.btn-gr [name="csrfmiddlewaretoken"]').val();
            data["csrfmiddlewaretoken"] = csrf_token;
            data["idBank"] = idBankCurRow;
            data["nameBank"] = nameBankCurRow;
            console.log(data)
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                cache: false,
                success: function(data){
                    console.log("succesful");
                    window.location.replace("/");
                },
                error : function(){
                    console.log("error");
                }
           });
        };
    });
});

function onFilter() {
  var filterName, fName, filterBik, fBik ,table, tr, tdName, tdBik, i;
  filterName = document.getElementById("filter-name");
  fName = filterName.value.toUpperCase();
  filterBik = document.getElementById("filter-bik");
  fBik = filterBik.value.toUpperCase();
  table = document.getElementById("table-banks");
  tr = table.getElementsByTagName("tr");
  var count = tr.length-1;

  for (i = 0; i < tr.length; i++) {
    tdBik = tr[i].getElementsByTagName("td")[1];
    tdName = tr[i].getElementsByTagName("td")[2];
    if (tdBik) {
      if (tdBik.innerHTML.toUpperCase().indexOf(fBik) > -1) {
        tr[i].style.display = "";
        if (tdName) {
          if (tdName.innerHTML.toUpperCase().indexOf(fName) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
            --count;
          }
        }
      } else {
        tr[i].style.display = "none";
        --count;
      }
    }
  }
  document.getElementById("countRow").innerHTML = count;
}






