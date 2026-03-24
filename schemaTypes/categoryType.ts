import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Categoría',
  type: 'document',
  fields: [
    defineField({
      name: 'nameES',
      title: 'Nombre (ES)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'nameEN',
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
          .regex(/^[A-Z0-9_]+$/, {
            name: 'uppercase',
            invert: false,
          })
          .error(
            'Debe estar en mayúsculas, números y guiones bajos (ej: TECH, DESIGN_UI, CATEGORY_2023)',
          ),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'nameES',
    },
    prepare(selection) {
      const {title} = selection
      return {
        title: title || 'Sin título',
      }
    },
  },
})
