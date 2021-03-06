'use strict'

const buildPatientQuery = require('../../lib/builders/patient-query')
const tap = require('tap')

tap.test('Patient query builder', (t) => {
  tap.test('should match on resource when there are no parameters', (t) => {
    const expectedQuery = {
      resourceType: 'Patient'
    }
    const query = buildPatientQuery({})
    t.deepEqual(query, expectedQuery)
    t.end()
  })

  tap.test('should add a filter for the identifier query parameter', (t) => {
    const expectedQuery = {
      resourceType: 'Patient',
      identifier: {
        $elemMatch: {
          value: '123'
        }
      }
    }
    const query = buildPatientQuery({
      identifier: '123'
    })
    t.deepEqual(query, expectedQuery)
    t.end()
  })

  tap.test('should add a filter for the identifier query parameter with a namespace', (t) => {
    const expectedQuery = {
      resourceType: 'Patient',
      identifier: {
        $elemMatch: {
          value: '123',
          system: 'http://acme.org/patient'
        }
      }
    }
    const query = buildPatientQuery({
      identifier: 'http://acme.org/patient|123'
    })
    t.deepEqual(query, expectedQuery)
    t.end()
  })

  tap.test('should add filters for multiple identifier query parameters', (t) => {
    const expectedQuery = {
      resourceType: 'Patient',
      $and: [
        {
          identifier: {
            $elemMatch: {
              value: '123'
            }
          }
        },
        {
          identifier: {
            $elemMatch: {
              value: '456'
            }
          }
        }
      ]
    }
    const query = buildPatientQuery({
      identifier: ['123', '456']
    })
    t.deepEqual(query, expectedQuery)
    t.end()
  })

  tap.test('should add filters for multiple identifier query parameters with a namespace', (t) => {
    const expectedQuery = {
      resourceType: 'Patient',
      $and: [
        {
          identifier: {
            $elemMatch: {
              value: '123',
              system: 'http://acme.org/patient'
            }
          }
        },
        {
          identifier: {
            $elemMatch: {
              value: '456',
              system: 'http://acme.org/patient2'
            }
          }
        }
      ]
    }
    const query = buildPatientQuery({
      identifier: ['http://acme.org/patient|123', 'http://acme.org/patient2|456']
    })
    t.deepEqual(query, expectedQuery)
    t.end()
  })

  t.end()
})
