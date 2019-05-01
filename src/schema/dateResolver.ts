const dateResolver = dateValue => (!dateValue ? null : (dateValue as Date).toJSON())

export { dateResolver }
