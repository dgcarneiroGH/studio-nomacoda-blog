import {defineField, defineType} from 'sanity'
//TODO: Añade el texto de introducción y las traducciones, ej: bodyES, bodyEN
export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    //#region Spanish Fields
    defineField({
      name: 'titleES',
      title: 'Título (ES)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerptES',
      title: 'Resumen (ES)',
      description:
        'Texto corto para usar en tarjetas de vista previa y en la introducción del artículo.',
      type: 'text',
      validation: (rule) => rule.required().max(250),
    }),
    defineField({
      name: 'bodyES',
      title: 'Cuerpo (ES)',
      type: 'array',
      of: [{type: 'block'}],
      validation: (rule) => rule.required(),
    }),

    //#endregion

    //#region Common Fields
    defineField({
      name: 'slug',
      title: 'Slug',
      description:
        'Campo generado automáticamente, que se usará a la hora de crear la URL para acceder al post',
      type: 'slug',
      options: {source: 'titleES'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
    }),
    defineField({
      name: 'usefulCount',
      title: 'Contador de "útil"',
      description:
        'Veces que los lectores han marcado este post como útil. Se incrementa desde la web (Netlify function); no editar a mano.',
      type: 'number',
      initialValue: 0,
      readOnly: true,
      validation: (rule) => rule.min(0).integer(),
    }),
    //#endregion

    //#region English fields
    defineField({
      name: 'titleEN',
      title: 'Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'excerptEN',
      title: 'Excerpt (EN)',
      description: 'Short text for preview cards and article introduction.',
      type: 'text',
      validation: (rule) => rule.max(250),
    }),
    defineField({
      name: 'bodyEN',
      title: 'Body (EN)',
      type: 'array',
      of: [{type: 'block'}],
    }),
    //#endregion
  ],
})
