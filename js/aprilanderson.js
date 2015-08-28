$(document).ready(function(){
	//custom event for page load
	$().bind("basic_functions", function(ev){aa_basic_functions(this)});
	//ajax events
	$('body').ajaxComplete(function(event,request, settings){$(this).trigger('basic_functions');});
	//image fades
	var num_images=$("div[id*='body_images']").length;
	fade_images('body_images',num_images,num_images+1,num_images);
	//live events
	$('.fade_hover li').live("mouseover", function(){
		$(this).stop().animate(
			{backgroundPosition:"(0 -250px)"}, 
			{duration:500})
		});
	$('.fade_hover li').live("mouseout", function(){
		$(this).stop().animate(
			{backgroundPosition:"(0 0)"}, 
			{duration:500})
		});
	$('a.inline_load').live("click", function(event){ajax_link(event,this)});
	
	//trigger the custom event on load
	$('body').trigger('basic_functions');
});
function aa_basic_functions(el){
	$(el).find(".lightbox li a").each(function() {
        $(this).lightBox();
    });
	$(el).find(".nav_about").localScroll({
	   target:'#main_content',
	   lazy:true,
	   easing:'easeOutCubic'
	});
	$(el).find(".gallery ul li img").each(function(){
		//get a random rotation angle
		var rand_direction=Math.random()*100;
		if(rand_direction>50){
			var rand_rotation=Math.random()*60;	
		}else{
			var rand_rotation=-Math.random()*50;
		}
		//el=jQuery($(this)).rotate(rand_rotation);
		var ease_time=1500;
		var rot=$(this).rotate({angle:rand_rotation,
			bind:
				[
					{"mouseover":function(){rot[0].fadeTo('slow',1);}},
					{"mouseout":function(){rot[0].fadeTo('slow',0.8);}}
				]
			});
		rot[0].fadeTo('slow',0.8);
		//reposition el
		rot[0].css('position','absolute');
		rot[0].css('top','200px');
		rot[0].css('left','400px');
		rot[0].animate({top: (rand_rotation+(Math.random()*350)),left: (rand_rotation+(Math.random()*450))},ease_time,'linear');
		$(rot[0]).draggable();
	});
}
function fade_images(string_base_id,image_num,last_image_num,max_num){
	var ease_time=15000;
	if(image_num>=max_num){
		image_num=max_num;
	}
	if(image_num==1){
		image_num=2;
		last_image_num=1;
	}
	//animate and loop
	if(image_num >last_image_num){
		$('#'+string_base_id+image_num).animate({dummy:1}, 12000).animate({opacity: 1},ease_time,'linear',function(){fade_images(string_base_id,image_num+1,image_num,max_num);});
	}else{
		$('#'+string_base_id+image_num).animate({dummy:1}, 12000).animate({opacity: 0},ease_time,'linear',function(){fade_images(string_base_id,image_num-1,image_num,max_num);});
	}
	
}
function ajax_link(e,el){
	e.preventDefault();
	//load the link into the content div
	var link=$(el).attr("href");
	$('#main_content div').fadeOut("slow");
	$('#main_content').load(link +' #main_content div');
}
