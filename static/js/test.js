$(function () {
    $('img').each(function () {
        // console.log($(this).attr('src'))
        var imgpath=$(this).attr('src')
        imgpath="{% static '"+imgpath+"'%}"
        $(this).attr('src',imgpath)

    })
    console.log($('body').html())
})