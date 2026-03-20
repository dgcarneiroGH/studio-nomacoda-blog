import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'titleES',
      title: 'Nombre (ES)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'titleEN',
      title: 'Name (EN)',
      type: 'string',
    }),
    defineField({
      name: 'value',
      title: 'Valor para API',
      description:
        'Valor que coincide con el enum PostCategory en Angular (ej: TECH, DESIGN, etc.)',
      type: 'string',
      validation: (rule) =>
        rule
          .required()
          .regex(/^[A-Z_]+$/, {
            name: 'uppercase',
            invert: false,
          })
          .error('Debe estar en mayúsculas y usar guiones bajos (ej: TECH, DESIGN_UI)'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'titleES'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'color',
      description: 'Color para mostrar la categoría en el frontend',
    }),
  ],
  preview: {
    select: {
      title: 'titleES',
      subtitle: 'value',
    },
  },
})
