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