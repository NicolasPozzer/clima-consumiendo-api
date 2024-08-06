import { ChangeEvent, FormEvent, useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css"
import { SearchType } from "../../types";
import Alert from "../Alert/Alert";


type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

export default function form({fetchWeather} : FormProps) {

  // con el generic "<SearchType>" le asignamos el tipo de dato
  //a el state search y setSearch
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })

  const [alert, setAlert] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement> |
    ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({
        ...search,
        [e.target.name] : e.target.value
    })// tomamos una copia de search y modificamos el atributo q queremos
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(Object.values(search).includes('')){
        setAlert("Todos los campos son obligatorios")
        return // con este return hacemos que no se ejecuten las siguientes lineas de codigo
    }
    fetchWeather(search)
  }

  return (
    <form className={styles.form}
            onSubmit={handleSubmit}
        >
        
        {alert && <Alert/>}
        <div className={styles.field}>
            <label htmlFor="city">Ciudad:</label>
            <input 
                id="city"
                type="text" 
                name="city"
                placeholder="Ciudad"
                value={search.city}
                onChange={handleChange}
            />
        </div>

        <div className={styles.fieldpais}>
            <label htmlFor="country">Pais:</label>
            <select
                className={styles.country}
                id="country"
                value={search.country}
                name="country"
                onChange={handleChange}
            >
                <option value="">-- Seleccione un Pais ---</option>
                {countries.map( country => (//Esto hace un select y recorre la carpeta data
                    <option
                        key={country.code}
                        value={country.code}
                    >{country.name}</option>
                ))}
            </select>
        </div>

        <input className={styles.submit} 
          type="submit" 
          value='Consultar Clima'
          
        />
    </form>
  )
}
