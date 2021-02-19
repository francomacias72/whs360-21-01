import React from 'react'
import CreateOrders from '../orders/CreateOrders'
import './Dashboard.css'

function Dashboard() {
    return (
        <div className="dashboard">
            <h1>DASHBOARD</h1>
            <CreateOrders />
            <div className="dashboardDetails">
                <div className="dashboardRow">
                    <div className="dashboardBox">
                        <h3>Clientes</h3>
                        <div className="mainNumber">3</div>
                    </div>
                    <div className="dashboardBox">
                        <h3>Partes</h3>
                        <div className="mainNumber">15</div>
                    </div>
                    <div className="dashboardBox">
                        <h3>Notificaciones</h3>
                        <div className="boxRow">
                            <p>Nuevas</p>
                            <div className="secondaryNumber">1</div>
                        </div>
                        <div className="boxRow">
                            <p>Leídas</p>
                            <div className="secondaryNumber">2</div>
                        </div>
                        <div className="boxRow">
                            <p>Total</p>
                            <div className="secondaryNumber">3</div>
                        </div>
                    </div>
                    <div className="dashboardBox">
                        <h3>Ordenes</h3>
                        <div className="boxRow">
                            <p>Abiertas</p>
                            <div className="secondaryNumber">3</div>
                        </div>
                        <div className="boxRow">
                            <p>Embarque Ready</p>
                            <div className="secondaryNumber">2</div>
                        </div>
                        <div className="boxRow">
                            <p>Total</p>
                            <div className="secondaryNumber">5</div>
                        </div>
                    </div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardBox">
                        <h3>Recibos</h3>
                        <div className="boxRow"><a href="#">Hoy</a></div>
                        <div className="boxRow"><a href="#">Semana</a></div>
                        <div className="boxRow"><a href="#">Mes</a></div>
                        <div className="boxRow"><a href="#">Año</a></div>
                    </div>
                    <div className="dashboardBox">
                        <h3>Embarques</h3>
                        <div className="boxRow"><a href="#">Hoy</a></div>
                        <div className="boxRow"><a href="#">Semana</a></div>
                        <div className="boxRow"><a href="#">Mes</a></div>
                        <div className="boxRow"><a href="#">Año</a></div>
                    </div>
                    <div className="dashboardBox">
                        <h3>Exportaciones</h3>
                        <div className="boxRow"><a href="#">Hoy</a></div>
                        <div className="boxRow"><a href="#">Semana</a></div>
                        <div className="boxRow"><a href="#">Mes</a></div>
                        <div className="boxRow"><a href="#">Año</a></div>
                    </div>
                    <div className="dashboardBox">
                        <h3>In Transit</h3>
                        <div className="mainNumber">10</div>
                    </div>
                </div>
                <div className="dashboardRow">
                    <div className="dashboardBox">
                        <h3>Reporte 1</h3>
                    </div>
                    <div className="dashboardBox">
                        <h3>Reporte 2</h3>
                    </div>
                    <div className="dashboardBox">
                        <h3>Reporte 3</h3>
                    </div>
                    <div className="dashboardBox">
                        <h3>Reporte 4</h3>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Dashboard
