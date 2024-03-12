/* This example requires Tailwind CSS v2.0+ */
import { MailIcon, PhoneIcon, PencilIcon } from '@heroicons/react/solid'
import ExpensePolicyModal from './ExpensePolicyModal'
import { Fragment, useState } from 'react'


// not required


// const expensePolicy = [
//   {
//     id: 'exp_policy_it_1',
//     name: 'Expense Policy for IT',
//     department: 'IT',
//     expenseType: 'Cab',
//   },
//   {
//     id: 'exp_policy_ops_1',
//     name: 'Expense Policy for Operations',
//     department: 'Operations',
//     expenseType: 'Flight',
//   },
//   {
//   id: 'exp_policy_sales_1',
//   name: 'Expense Policy for Sales',
//   department: 'Sales',
//   expenseType: 'Flight',
//   },
//   {
//     id: 'exp_policy_ops_2',
//     name: 'Expense Policy for Operations',
//     department: 'Operations',
//     expenseType: 'Hotel',
//     },
//     {
//       id: 'exp_policy_marketing_1',
//       name: 'Expense Policy for Marketing',
//       department: 'Marketing',
//       expenseType: 'Food',
//     },
//     {
//       id: 'exp_policy_finance_1',
//       name: 'Expense Policy for Finance',
//       department: 'Finance',
//       expenseType: 'Hotel',
//       },
//   // More people...
// ]

export default function CardListExpensePolicy() {

  const [expensePolicy, setExpensePolicy] = useState([
    {
      id: 'exp_policy_it_1',
      name: 'Expense Policy for IT',
      department: 'IT',
      expenseType: 'Cab',
      editState: false,
    },
    {
      id: 'exp_policy_ops_1',
      name: 'Expense Policy for Operations',
      department: 'Operations',
      expenseType: 'Flight',
      editState: false,
    },
    {
    id: 'exp_policy_sales_1',
    name: 'Expense Policy for Sales',
    department: 'Sales',
    expenseType: 'Flight',
    editState: false,
    },
    {
      id: 'exp_policy_ops_2',
      name: 'Expense Policy for Operations',
      department: 'Operations',
      expenseType: 'Hotel',
      editState: false,
      },
      {
        id: 'exp_policy_marketing_1',
        name: 'Expense Policy for Marketing',
        department: 'Marketing',
        expenseType: 'Food',
        editState: false,
      },
      {
        id: 'exp_policy_finance_1',
        name: 'Expense Policy for Finance',
        department: 'Finance',
        expenseType: 'Hotel',
        editState: false,
        },
    
  ]);

  function handleEditSaveClick(){

  }

  return (
    <ul role="list" className="grid grid-cols-12 gap-4 sm:grid-cols-12 lg:grid-cols-12 bg-slate-50">
      {expensePolicy.map((expensePolicy) => (
        <li key={expensePolicy.id} className="col-span-12 bg-white rounded-lg shadow divide-y divide-gray-200 peer-checked:bg-teal-100">
          <div className="w-full flex items-center justify-between p-6 space-x-4 divide-x divide-gray-300">
          
          
          <input
            id="expPolicy-actions-selected"
            aria-describedby="expPolicy-actions-selected"
            name="expPolicy-actions-selected"
            type="checkbox"
            className="peer h-4 w-4 hover:bg-teal-500 text-teal-600 border-gray-300 rounded cursor-pointer focus:ring-0 focus:ring-offset-0"
          />
          <form class="w-full max-w-lg">
          <div class="flex flex-col flex-wrap mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-expensePolicy-name">
              Expense Policy Name
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-expensePolicy-name" type="text" placeholder={expensePolicy.name}/>
        
          
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-expense-type">
              Expense Type
            </label>
            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-expense-type" type="text" placeholder={expensePolicy.expenseType}/>
          </div>
          </div>
            <div className="flex-1 truncate divide-x divide-gray-300 flex-col">
              <div className="flex items-center space-x-3 ml-4 flex-row">
              
                <h3 className="text-gray-900 text-sm font-medium truncate">{expensePolicy.name}</h3>
                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                  {expensePolicy.expenseType}
                </span>
                <span className="flex-shrink-0 inline-block px-2 py-0.5 text-cyan-600 text-xs font-medium bg-cyan-100 rounded-full">
                  {expensePolicy.department}
                </span>

              </div>
              
            </div>
          </form>
            
            
            <div className="flex-col inline-flex items-center justify-center w-8 h-8 space-y-2">
              <button onClick={() => handleEditSaveClick()} className=" text-teal-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-teal-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
              </button>
              <button className=" text-red-400 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-red-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
              </button>
            </div>
          </div>

          <ExpensePolicyModal></ExpensePolicyModal>
          
          
        </li>
      ))}
    </ul>
  )
}