jQuery(document).ready(function(){
    if(!localStorage.getItem('dogeville.games.dogedrawer.importedbrushes')){
        localStorage.setItem('dogeville.games.dogedrawer.importedbrushes','[]');
    }
    if(!localStorage.getItem('dogeville.games.dogedrawer.importedbackground')){
        localStorage.setItem('dogeville.games.dogedrawer.importedbackground','[]');
    }
    function isUrlValid(url){
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
    }
    if($('.cd-stretchy-nav').length>0){
        var stretchyNavs = $('.cd-stretchy-nav');
        stretchyNavs.each(function(){
            var stretchyNav = $(this),
                stretchyNavTrigger = stretchyNav.find('.cd-nav-trigger');
            stretchyNavTrigger.on('click', function(event){
                event.preventDefault();
                stretchyNav.toggleClass('nav-is-visible');
            });
        });
        $(document).on('click', function(event){
            ( !$(event.target).is('.cd-nav-trigger') && !$(event.target).is('.cd-nav-trigger span') ) && stretchyNavs.removeClass('nav-is-visible');
        });
    }
    var colors = ["#003c5d","rgb(244, 67, 54)","rgb(233, 30, 99)","rgb(156, 39, 176)","rgb(103, 58, 183)","rgb(63, 81, 181)","rgb(33, 150, 243)","rgb(3, 169, 244)","rgb(0, 188, 212)","rgb(0, 150, 136)","rgb(76, 175, 80)","rgb(139, 195, 74)","rgb(205, 220, 57)","rgb(255, 235, 59)","rgb(255, 193, 7)","rgb(255, 152, 0)","rgb(255, 87, 34)","rgb(121, 85, 72)","rgb(158, 158, 158)","rgb(96, 125, 139)","#FFFFFF","#EEEEEE","#222222","#000000"];
    var brushes = ["img/faces/right.png","img/faces/bark.png","img/faces/coin.png","img/faces/crossyroads.png","img/faces/glasses.png","img/faces/minecraft.png","img/faces/sitting.png","img/faces/smile.png"];
    var fonts = ["cursive","Oswald","Source Sans Pro","Indie Flower","Sigmar One","Josefin Sans","Shadows Into Light","Pacifico","Amatic SC","Bangers","Gloria Hallelujah","Kaushan Script","Playball","Rock Salt","Tangerine","Paytone One","Just Another Hand","VT323","Calligraffitti","Freckle Face"];
    var draw_mode = false;
    var erase_mode = false;
    var brush_link = brushes[0];
    var demoBrush_in = false;
    var frozen = false;
    var snake_effect = false;
    var textColor_b = false;
    if($(window).width()<=1000) $('#brushSize').val($(window).width()/5);
    $('#mode').click(function(){
        if(snake_effect) clearInterval(snake_effect);
        frozen = false;
        $('#modesModal').modal();
    });
    $('.cd-main-content').on('click',function(){
        if(!$('.dogetext').is(':focus')){
            if($('input:focus').is('*')){
                $('#mode span').html('View');
                draw_mode = false;
            }else if(!frozen){
                $('#mode span').html(!draw_mode?'Draw':'View');
                draw_mode = !draw_mode;
            }
        }
        erase_mode = false;
        return false;
    });
    $('.cd-main-content').on('contextmenu',function(){
        if(!frozen && !$('.dogetext').is(':focus')){
            $('#mode span').html(!erase_mode?'Erase':'View');
            draw_mode = false;
            erase_mode = !erase_mode;
        }
        return false;
    });
    $('body').on('mousemove',function(ev){
        if(draw_mode && !$('#modes').is(':hover') && !$('.dogetext').is(':focus')){
            var img = $('<img>');
            $(img).on('click',function(){
                if(!frozen){
                    $('#mode span').html(!draw_mode?'Draw':'View');
                    draw_mode = !draw_mode;
                    erase_mode = false;
                }
                return false;
            });
            $(img).on('contextmenu',function(){
                if(!frozen){
                    $('#mode span').html(!erase_mode?'Erase':'View');
                    draw_mode = false;
                    erase_mode = !erase_mode;
                    $(this).remove();
                }
                return false;
            });
            var img_size = $('#brushSize').val();
            $(img).on('mouseover',function(){
              if(erase_mode) $(this).remove();
            });
            $(img).attr('src',brush_link);
            $(img).addClass('dogehead');
            $(img).data({bg:$('.cd-main-content').css('background')});
            $(img).on('dragstart',function(ev){ev.preventDefault();});
            $(img).css('left',(ev.pageX-(img_size/2))+'px');
            $(img).css('top',(ev.pageY-(img_size/2))+'px');
            $(img).css('opacity',$('#brushOpacity').val()/100);
            $(img).css('border-radius',$('#brushRadius').val()+'%');
            $(img).css('width',img_size+'px');
            $('.cd-main-content').append(img);
        }
    });
    $(document).keyup(function(ev){
        if(!ev.altKey && !ev.ctrlKey && !ev.shiftKey && !$('.modal').is(':visible') && !$('#loading').is(':visible') && !$('.dogetext').is(':focus')){
            if(!frozen){
                if(ev.keyCode==86) $('#viewMode').click();
                if(ev.keyCode==68) $('#drawMode').click();
                if(ev.keyCode==69) $('#eraseMode').click();
                if(ev.keyCode==67 && $('#capture').is(':visible')) $('#captureFrame').click();
            }
            if(ev.keyCode==32) $('.cd-nav-trigger').click();
            if(ev.keyCode>=49 && ev.keyCode<=54 && $('.cd-stretchy-nav').is('.nav-is-visible')) $('.cd-stretchy-nav ul li').eq(ev.keyCode-49).find('a').click();
        }
    });
    $.each(colors,function(id,color){
        var code = $($('#colorTemplate').html());
        if(id==0) $(code).find('img').attr('src','img/transparent-tick.png');
        $(code).find('img').css('background-color',color);
        $(code).click(function(){
            $('#colorPlate .thumbnail img').attr('src','img/transparent.png');
            $(this).find('img').attr('src','img/transparent-tick.png');
            $('.cd-main-content').css('background-image','none');
            $('.cd-main-content').css('background-color',color);
        });
        $(code).on('contextmenu',function(){return false;});
        $('#colorPlate').append(code);
    });
    $.each(colors,function(id,color){
        var code = $($('#colorTemplate').html());
        $(code).find('img').css('background-color',color);
        $(code).find('img').data('bg-color',color);
        $(code).click(function(){
            $($('#textColor').data('element')).css('color',$(this).find('img').data('bg-color'));
            $('#textColor').modal('hide');
        });
        $(code).on('contextmenu',function(){return false;});
        $('#textPlate').append(code);
    });
    $.each(fonts,function(id,font){
        var code = $($('#fontTemplate').html());
        $(code).find('h4').css('font-family',font);
        $(code).find('h4').data('bg-font',font);
        $(code).click(function(){
            $($('#textColor').data('element')).css('font-family',$(this).find('h4').data('bg-font'));
            $('#textColor').modal('hide');
        });
        $(code).on('contextmenu',function(){return false;});
        $('#fontPlate').append(code);
    });
    $.each(JSON.parse(localStorage.getItem('dogeville.games.dogedrawer.importedbackground')),function(id,bg_img){
        var code = $($('#colorTemplate').html());
        $(code).find('img').css('background-image','url('+bg_img+')').attr('bg-src',bg_img);
        $(code).click(function(){
            $('#brushPlate .thumbnail img').attr('src','img/transparent.png');
            $(this).find('img').attr('src','img/transparent-tick.png');
            $('.cd-main-content').css('background-image','url('+$(this).find('img').attr('bg-src')+')');
        });
        $(code).on('contextmenu',function(){
            var y = JSON.parse(localStorage.getItem('dogeville.games.dogedrawer.importedbackground'));
            var removeItem = $(this).find('img').attr('bg-src');
            y = jQuery.grep(y, function(value){return value!=removeItem;});
            localStorage.setItem('dogeville.games.dogedrawer.importedbackground',JSON.stringify(y));
            $(this).remove();
            return false;
        });
        $('#colorPlate').append(code);
    });
    $.each(brushes,function(id,brush){
        var code = $($('#colorTemplate').html());
        if(id==0) $(code).find('img').attr('src','img/transparent-tick.png');
        $(code).find('img').css('background-image','url('+brush+')');
        $(code).click(function(){
            $('#brushPlate .thumbnail img').attr('src','img/transparent.png');
            $(this).find('img').attr('src','img/transparent-tick.png');
            brush_link = brush;
            $('#brushSize').trigger('change');
        });
        $(code).on('contextmenu',function(){return false;});
        $('#brushPlate').append(code);
    });
    $.each(JSON.parse(localStorage.getItem('dogeville.games.dogedrawer.importedbrushes')),function(id,brush){
        var code = $($('#colorTemplate').html());
        $(code).find('img').css('background-image','url('+brush+')').attr('bg-src',brush);
        $(code).click(function(){
            $('#brushPlate .thumbnail img').attr('src','img/transparent.png');
            $(this).find('img').attr('src','img/transparent-tick.png');
            brush_link = brush;
            $('#brushSize').trigger('change');
        });
        $(code).on('contextmenu',function(){
            var y = JSON.parse(localStorage.getItem('dogeville.games.dogedrawer.importedbrushes'));
            var removeItem = $(this).find('img').attr('bg-src');
            y = jQuery.grep(y, function(value){return value!=removeItem;});
            localStorage.setItem('dogeville.games.dogedrawer.importedbrushes',JSON.stringify(y));
            $(this).remove();
            return false;
        });
        $('#brushPlate').append(code);
    });
    $('#brushSize,#brushOpacity,#brushRadius').on('change',function(){
        if(demoBrush_in) clearInterval(demoBrush_in);
        $('#demoBrush').show();
        $('#demoBrush img').attr('src',brush_link).css({'width':$('#brushSize').val()+'px','max-width':'none','border-radius':$('#brushRadius').val()+'%','opacity':$('#brushOpacity').val()/100});
        demoBrush_in = setTimeout(function(){
            $('#demoBrush').hide();
        },1000);
    });
    $('#backgroundSelection .modal-body button').click(function(){
    if($('#backgroundSelection input[type="file"]')[0].files && $('#backgroundSelection input[type="file"]')[0].files[0]){
            $('#backgroundSelection').modal('hide');
            $('#errorModal .modal-title').html('Please wait...');
            $('#errorModal .modal-body').html('Validating and importing image...');
            $('#errorModal').modal();
        var FR = new FileReader();
        FR.onload = function(e) {
        var img_link = e.target.result;
                var img = $('<img>');
               $(img).attr('src',img_link);
                 $(img).error(function(){
                     $('#errorModal .modal-title').html('Oops');
                     $('#errorModal .modal-body').html('Unable to render image!');
                     $('#errorModal').modal();
                     $(this).remove();
                 });
                 $(img).on('load',function(){
                     $('.cd-main-content').css('background-image','url('+$(this).attr('src')+')');
                     $('#errorModal').modal('hide');
                     background_link = $(this).attr('src');
                     $('#colorPlate .thumbnail img').attr('src','img/transparent.png');
                     var color = background_link;
                     var code = $($('#colorTemplate').html());
                     $(code).find('img').attr('src','img/transparent-tick.png');
                     $(code).find('img').css('background-image','url('+color+')').attr('bg-src',color);
                     $(code).click(function(){
                         $('#colorPlate .thumbnail img').attr('src','img/transparent.png');
                         $(this).find('img').attr('src','img/transparent-tick.png');
                         $('.cd-main-content').css('background-image','url('+$(this).find('img').attr('bg-src')+')');
                    });
                     $(code).on('contextmenu',function(){
                         var y = JSON.parse(localStorage.getItem('dogeville.games.dogedrawer.importedbackground'));
                         var removeItem = $(this).find('img').attr('bg-src');
                         y = jQuery.grep(y, function(value){return value!=removeItem;});
                         localStorage.setItem('dogeville.games.dogedrawer.importedbackground',JSON.stringify(y));
                         $(this).remove();
                         return false;
                     });
                     $('#colorPlate').append(code);
                     var importedbackgrounds = JSON.parse(localStorage.getItem('dogeville.games.dogedrawer.importedbackground'));
                     importedbackgrounds.push($(this).attr('src'));
                     localStorage.setItem('dogeville.games.dogedrawer.importedbackground',JSON.stringify(importedbackgrounds));
                     $(this).remove();
                 });
                 $(img).hide();
                 $(img).append('body');
    };
    FR.readAsDataURL($('#backgroundSelection input[type="file"]')[0].files[0]);
        }    else {
            $('#errorModal .modal-title').html('Oops');
            $('#errorModal .modal-body').html('Please select a valid image.');
            $('#errorModal').modal();
        }
        $('#backgroundSelection input[type="text"]').val('');
    });
    $('#brushSelection .modal-body button').click(function(){
    if($('#brushSelection input[type="file"]')[0].files && $('#brushSelection input[type="file"]')[0].files[0]){
        $('#brushSelection').modal('hide');
        $('#errorModal .modal-title').html('Please wait...');
        $('#errorModal .modal-body').html('Validating and importing image...');
        $('#errorModal').modal();
        var FR = new FileReader();
        FR.onload = function(e) {
        var img_link = e.target.result;
              var img = $('<img>');
               $(img).attr('src',img_link);
                 $(img).error(function(){
                     $('#errorModal .modal-title').html('Oops');
                     $('#errorModal .modal-body').html('Unable to render image!');
                     $('#errorModal').modal();
                     $(this).remove();
                 });
                 $(img).on('load',function(){
                    brush_link = $(this).attr('src');
                     $('#errorModal').modal('hide');
                     $('#brushSelection .thumbnail img').attr('src','img/transparent.png');
                     var bg_img = brush_link;
                     var code = $($('#colorTemplate').html());
                     $(code).find('img').attr('src','img/transparent-tick.png');
                     $(code).find('img').css('background-image','url('+bg_img+')').attr('bg-src',bg_img);
                     $(code).click(function(){
                         $('#colorPlate .thumbnail img').attr('src','img/transparent.png');
                         $(this).find('img').attr('src','img/transparent-tick.png');
                        brush_link = $(this).find('img').attr('bg-src');
                     });
                     $(code).on('contextmenu',function(){
                         var y = JSON.parse(localStorage.getItem('dogeville.games.dogedrawer.importedbrushes'));
                         var removeItem = $(this).find('img').attr('bg-src');
                         y = jQuery.grep(y, function(value){return value!=removeItem;});
                         localStorage.setItem('dogeville.games.dogedrawer.importedbrushes',JSON.stringify(y));
                         $(this).remove();
                         return false;
                     });
                     $('#brushPlate').append(code);
                     var importedbrushes = JSON.parse(localStorage.getItem('dogeville.games.dogedrawer.importedbrushes'));
                     importedbrushes.push($(this).attr('src'));
                     localStorage.setItem('dogeville.games.dogedrawer.importedbrushes',JSON.stringify(importedbrushes));
                     $(this).remove();
                 });
                 $(img).hide();
                 $(img).append('body');
    };
    FR.readAsDataURL($('#brushSelection input[type="file"]')[0].files[0]);
        } else {
            $('#errorModal .modal-title').html('Oops');
            $('#errorModal .modal-body').html('Please select a valid image.');
            $('#errorModal').modal();
        }
        $('#brushSelection input[type="file"]').val('');
    });
    $('ul li a.cd-setbackground').click(function(){
        $('#backgroundSelection').modal();
    });
    $('ul li a.cd-setbrush').click(function(){
        $('#brushSelection').modal();
    });
    $('ul li a.cd-texttool').click(function(){
        if(!textColor_b){
            textColor_b = true;
            $('#textToolModal').modal();
        }
        el = $('<div>');
        $(el).addClass('dogetext');
        $(el).html('Sample text');
        $(el).draggable();
        $(el).attr('contenteditable','true');
        $(el).click(function(){$(this).select();});
        $(el).blur(function(){
          if(!$(this).text()) $(this).remove();
          window.getSelection().removeAllRanges();
        });
        $(el).data('size','15');
        $(el).data('rotation','0');
        $(el).bind('dblclick', function(ev){
            $('#mode span').html('View');
            draw_mode = false;
            erase_mode = false;
            $('#textColor').data('element',this);
            $('#textColor').modal();
        });
        $(el).bind('contextmenu', function(ev){
          $(this).remove();
          return false;
        });
        $(el).css('color','red');
        $(el).css('font-size','15px');
        $(el).css('-ms-transform','rotate(0deg)');
        $(el).css('-webkit-transform','rotate(0deg)');
        $(el).css('transform','rotate(0deg)');
        $('main').append(el);
    });
    $('ul li a.cd-creategif').click(function(){
        $('#capture').fadeToggle('fast');
    });
    $(document).bind('mousewheel', function(ev){
        if($('.dogetext:hover').is('*')){
            if(ev.originalEvent.wheelDelta /120 > 0){
                $('.dogetext:hover').data('size',Number($('.dogetext:hover').data('size'))+1);
            } else {
                $('.dogetext:hover').data('size',Number($('.dogetext:hover').data('size'))-1);
            }
            $('.dogetext:hover').css('font-size',$('.dogetext:hover').data('size')+'px');
        }
    });
    $(document).bind('keydown', function(ev){
        if($('.dogetext:hover').is('*')){
            var rotate = $('.dogetext:hover').data('rotation');
            if(ev.keyCode==38) $('.dogetext:hover').data('rotation',Number(rotate)+1);
            if(ev.keyCode==40) $('.dogetext:hover').data('rotation',Number(rotate)-1);
            $('.dogetext:hover').css('-ms-transform','rotate('+rotate+'deg)');
            $('.dogetext:hover').css('-webkit-transform','rotate('+rotate+'deg)');
            $('.dogetext:hover').css('transform','rotate('+rotate+'deg)');
        }
    });
    $('ul li a.cd-download').click(function(){
        $('#errorModal .modal-title').html('Rendering...');
        $('#errorModal .modal-body').html('Rendering your creation to image format...');
        $('#errorModal').modal();
        $('#flash').fadeIn('100',function(){
            $(this).fadeOut('100');
        });
        $('#logo').show();
        html2canvas(document.getElementById('container'), {
          onrendered: function(canvas) {
                var link = canvas.toDataURL();
                $('#downloadModal .modal-body a').attr('href',link);
                $('#downloadModal .modal-body a').attr('download','dogedrawer.png');
                $('#downloadModal .modal-body img').attr('src',link);
                $('#errorModal').modal('hide');
                $('#downloadModal').modal();
                $('#logo').hide();
          }
        });
    });
    $('#mode,nav.cd-stretchy-nav').click(function(){
        if(snake_effect) clearInterval(snake_effect);
        frozen = false;
        $('#mode span').html('View');
        draw_mode = false;
        erase_mode = false;
    });
    $('#viewMode').click(function(){
        $('#modesModal').modal('hide');
        if(!frozen){
            $('#mode span').html('View');
            draw_mode = false;
            erase_mode = false;
        }
    });
    $('#drawMode').click(function(){
        $('#modesModal').modal('hide');
        if(!frozen){
            $('#mode span').html('Draw');
            draw_mode = true;
            erase_mode = false;
        }
    });
    $('#eraseMode').click(function(){
        $('#modesModal').modal('hide');
        if(!frozen){
            $('#mode span').html('Erase');
            draw_mode = false;
            erase_mode = true;
        }
    });
    $('#captureFrame').click(function(){
        $('#errorModal .modal-title').html('Rendering...');
        $('#errorModal .modal-body').html('Rendering frame...');
        $('#errorModal').modal();
        $('#flash').fadeIn('100',function(){
            $(this).fadeOut('100');
        });
        $('#logo').show();
        html2canvas(document.getElementById('container'), {
          onrendered: function(canvas) {
                var link = canvas.toDataURL();
                var el = $('<img>');
                $(el).attr('src',link);
                $(el).contextmenu(function(){
                    $(this).remove();
                    $('#captureFrames').html($('#framesPlate img').length);
                    return false;
                });
                $('#framesPlate').append(el);
                $('#captureFrames').html($('#framesPlate img').length);
                $('#errorModal').modal('hide');
                $('#logo').hide();
          }
        });
    });
    $('#captureFrames,#captureDownload').click(function(){
        $('#framesModal').modal();
    });
    $('#gifCreate').click(function(){
        $('#framesModal').modal('hide');
        draw_mode = false;
        erase_mode = false;
        $('#mode span').html('View');
        if($('#framesPlate img').length==0){
            $('#errorModal .modal-title').html('Oops');
            $('#errorModal .modal-body').html('At least one frame must be added in order to create GIF.');
            $('#errorModal').modal();
        }else{
            $('#loading div').html('Creating GIF...');
            $('#loading').fadeIn('fast');
            frozen = true;
            var list = [];
            $('#framesPlate img').each(function(){
                list.push($(this).attr('src'));
            });
            gifshot.createGIF(
                {
                    gifWidth: $(window).width(),
                  gifHeight: $(window).height(),
                    images: list,
                    interval: Number($('#frameInterval').val()),
                    numFrames: Number($('#framesPlate img').length)
                },
                function(obj){
                    $('#loading').fadeOut('fast');
                    $('#logo').hide();
                    frozen = false;
                    if(!obj.error){
                        var image = obj.image;
                        $('#downloadModal .modal-body a').attr('href',image);
                        $('#downloadModal .modal-body a').attr('download','dogedrawer.gif');
                        $('#downloadModal .modal-body img').attr('src',image);
                        $('#downloadModal').modal();
                    }else{
                        $('#errorModal .modal-title').html('Oops');
                        $('#errorModal .modal-body').html('An error occured while generating GIF.');
                        $('#errorModal').modal();
                    }
                }
            );
        }
    });
    $('ul li a.cd-more').click(function(){
        $('#moreModal').modal();
    });
    $('#clearCreation').click(function(){
        $('#moreModal').modal('hide');
        draw_mode = false;
        erase_mode = false;
        $('#mode span').html('View');
        $('#brushSize').val('200');
        $('#brushOpacity').val('100');
        $('#brushRadius').val('0');
        $('#flash').fadeIn('100',function(){
            $('#framesPlate').html('');
            $('#captureFrames').html('0');
            $('#capture').hide();
            $('.dogehead,.dogetext').remove();
            $('#colorPlate .thumbnail:first img').click();
            $('#brushPlate .thumbnail:first img').click();
            $('#flash').fadeOut('100');
        });
    });
    $('#snakeAway').click(function(){
        $('#moreModal').modal('hide');
        draw_mode = false;
        erase_mode = false;
        $('#mode span').html('Snake');
        frozen = true;
        var bg_deault = $('.cd-main-content').css('background');
        snake_effect = setInterval(function(){
            if($('.dogehead:not(.removed),.dogetext:not(.removed)').length<1){
                setTimeout(function(){
                    $('#flash').fadeIn('100',function(){
                        $('#framesPlate').html('');
                        $('#captureFrames').html('0');
                        $('#capture').hide();
                        $('#mode span').html('View');
                        $('.dogehead:not(.removed),.dogetext:not(.removed)').remove();
                        $('#colorPlate .thumbnail:first img').click();
                        $('#brushPlate .thumbnail:first img').click();
                        $('#flash').fadeOut('100');
                    });
                },1000);
                frozen = false;
                clearInterval(snake_effect);
            }else{
                var bg_n = $('.dogehead:not(.removed),.dogetext:not(.removed)').last().data('bg');
                $('.cd-main-content').css('background',bg_n||bg_deault);
                $('.dogehead:not(.removed),.dogetext:not(.removed)').last().addClass('removed').fadeOut('10');
            }
        },10);
        $('#brushSize').val('200');
        $('#brushOpacity').val('100');
        $('#brushRadius').val('0');
    });
    $('#clearCache').click(function(){
        $('#moreModal').modal('hide');
        draw_mode = false;
        erase_mode = false;
        $('#mode span').html('View');
        $('#brushSize').val('200');
        $('#brushOpacity').val('100');
        $('#brushRadius').val('0');
        $('#flash').fadeIn('100',function(){
            $('#framesPlate').html('');
            $('#captureFrames').html('0');
            $('#capture').hide();
            $('.dogehead,.dogetext').remove();
            $('#colorPlate .thumbnail:first img').click();
            $('#brushPlate .thumbnail:first img').click();
            localStorage.setItem('dogeville.games.dogedrawer.importedbrushes','[]');
            localStorage.setItem('dogeville.games.dogedrawer.importedbackground','[]');
            $('#colorPlate [bg-src],#brushPlate [bg-src]').each(function(){
                $(this).parent().remove();
            });
            $('#flash').fadeOut('100');
        });
    });
    WebFontConfig = {
    google: { families: [ 'Oswald::latin', 'Source+Sans+Pro::latin', 'Indie+Flower::latin', 'Sigmar+One::latin', 'Josefin+Sans::latin', 'Shadows+Into+Light::latin', 'Pacifico::latin', 'Amatic+SC::latin', 'Bangers::latin', 'Gloria+Hallelujah::latin', 'Kaushan+Script::latin', 'Playball::latin', 'Rock+Salt::latin', 'Tangerine::latin', 'Paytone+One::latin', 'Just+Another+Hand::latin', 'VT323::latin', 'Calligraffitti::latin', 'Freckle+Face::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
        wf.onload = function(){
            $('#loading').fadeOut('fast');
        };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
});
