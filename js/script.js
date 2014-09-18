// Работаем с моделями --------------
$(function(){
	var View = {};

	// Модель полей -----------------------------
	var Fields = {
		get: function (id) {
			// Вытаскивание данных по id
	    return this.data[id];
	  },
	  data:{
	  	// Данные по умолчанию
	  	'input1': {
	  		'options': {
	  			'name': 'input1', 
	  			'type': 'text' 
	  		},
	  		'display': 'block'
	  	}
	  },
	  update: function (id, value) {
	  	// Разбираем валуе
			var fieldData = this.data[id];

			$.each(value, function(key, value){
				if(fieldData[key]) {
					fieldData[key] = value;
				}
			});

			View.FieldsView.updateView(this.data);
	  }
	};

	// Меняем список полей -----------------------------
	Fields.data = {
		'input1': {
			'label': 'Ваше имя', 
			'options': {
				'name': 'input1', 
				'type': 'text', 
				'placeholder': 'Имя' 
			}
		},
		'input2': { 
			'label': 'и фамилия',
			'options': {
				'name': 'input2', 
				'type': 'text', 
				'placeholder': 'Фамилия'
			},
			'display': 'none',
			'showif': {
  			'input3': {checked:true}
  		}
		},
		'input3': {
			'label': 'и отчество',
			'options': {
				'name': 'input3', 
				'type': 'checkbox',  
				'placeholder': 'Отчество'
			}
		}
	};

	// Выд вывода полей -----------------------------
	View.FieldsView = {
		render:function (fieldsData) {
			$.each(fieldsData, function(key, value) {
  			// Берем шаблон
				var tpl = $($('#feildTpl').html());
				// Вставляем в документ
				$('#myform').append(tpl);

				// Обрабатываем объект
				tpl.css( "display", value.display );

				tpl.find('label').html( value.label );
				tpl.find('label').attr( "for", value.options.name );

				tpl.find('input').attr( "id", value.options.name );
				tpl.find('input').attr( "name", value.options.name );
				tpl.find('input').attr( "placeholder", value.options.placeholder );
				tpl.find('input').attr( "type", value.options.type );

				View.FieldsView.fieldevent(tpl);		

			});
		},
		fieldevent:function (field) {
			// События изменения
			field.change(function() {
				//Fields.update('input1', {'label': 'ФИО', 'options':{'placeholder':'ФИО'} });
				View.FieldsView.updateView(Fields.data);
			});
		},
		updateView: function (fieldsData){
			$.each(fieldsData, function(key, value) {
				var setfieldid = '#'+key;
				
				if(value.showif){
					$.each(value.showif, function(key, value) {
						var getfieldid = '#'+key;
						$.each(value, function(key, value) {
							if($(getfieldid).prop(key) == value){
								$(setfieldid).parent().css('display','block');
							}
							else {
								$(setfieldid).parent().css('display','none');
							}
						});
					});
				}

				$.each(value.options, function(key, value) {
					$(setfieldid).attr(key, value);
				});

				// Обновление контента лейбла
				$(setfieldid).parent().find('label').html(value.label);

			});
		}
	};

	var form = new View.FieldsView.render(Fields.data);
});








/*

// Работа с шаблоном
function getTemplate(idTpl, target){
	// Берем шаблон
	var tpl = $($('#'+idTpl).html());

	// Вставляем в документ
	$('#'+target).append(tpl);

	return tpl;
}

// Построение объекта
function buildControl(field){

	var el = getTemplate('feildTpl', 'myform');

	console.log(el);

----------- 
*/


/*
	// вытаскиваем шаблон
	var el = $($('#feildTpl').html());
	$('#myform').append(el);

	el.find('label').text('sdfsd');

	
	var cntl = $('#feildTpl').html();

	$('#myform').append(cntl);
*/




	/*
	var label = 'Что то пиздец';
	var iType = 'text';
	var iName = 'any_field';
	// var cntl = $('.field');
	$('.field').find('label').text(label);
	$('.field label').text(label);
	console.log('field label', $('#feildTplHtml').find('label').html());
	$('.field input').attr('type', iType);
	$('.field input').attr('name', iName);

	$('.field').appendTo($('#myform'));

	//cntl = $.parseHTML(cntl);

	//console.log(cntl);



	//console.log($(cntl).find(div));

	var labl = $('<label/>', options);
	var cntl = $('<' + name + '/>', options);
	if (css) {
		cntl.css(css);
	}
	if (cbname && callback) {
		cntl.on(cbname, callback);
	}

	 */

	//cntl.find('input').addClass('input');


	//return cntl;
//}
/*
$(function(){
	// Объект - список полей
	var objs = {
		fields:[
		{
			name: 'input',
			options: {
				id: 'input1',
				name: 'input1',
				type: 'text'
			},
			css: {
				backgroundColor: '#f50'
			},
			form: 'myform'
		},
		{
			name: 'input',
			options: {
				id: 'input2',
				name: 'input2',
				type: 'text'
			},
			css: {
				backgroundColor: '#f50'
			},
			form: 'myform'
		}]
	};

	for (var i in objs.fields) {
		var o = objs.fields[i];
		buildControl(o);
		// $('#'+o.form).append(buildControl(o) );
	}

	console.log(objs);
});	



/*
// Построение объекта
function buildControl(name, options, css, form, cbname, callback){
	var cntl = $('<' + name + '/>', options);
	if (css) {
		cntl.css(css);
	}
	if (cbname && callback) {
		cntl.on(cbname, callback);
	}
	
	return cntl;
}


$(function(){
	var objs = [
	{
		groupName: 'Group1',
		fields : [{
			name: 'input',
			options: {
				id: 'input1',
				name: 'input1',
				type: 'text'/*,
				cls: 'myclass'*/ /*
			},
			css: {
				backgroundColor: '#f50'
			},
			form: 'myform',
			cbname: 'click',
			callback: function(){
				console.log($(this).attr('name') + ' clicked');
			}
		}, {
			name: 'input',
			options: {
				id: 'input2',
				name: 'input2',
				type: 'text'
			},
			css: {
				backgroundColor: '#05f'
			},
			form: 'myform',
			cbname: 'click',
			callback: function(){
				console.log($(this).attr('name') + ' clicked');
			}
		}]
	}];

/*
	for (var i in objs) {
		var o = objs[i];
		buildControl(o.name, o.options, o.css, o.form, o.cbname, o.callback);
	}
*/ /*
	for (var i in objs) {
		var o = objs[i];
		var groupStr = '<div>';
		for (var j in o.fields) {
			var f = o.fields[j];
			groupStr += buildControl(f.name, f.options, f.css, f.form, f.cbname, f.callback);
		}
		groupStr += '</div>';
		$(groupStr).appendTo($('#myform'));
	}
}); */