import { useState, useMemo } from 'react';
import { useCampuses } from '../../hooks/useCampuses';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { CampusModel } from '../../../core/models/campus.model';

const EMPTY_VALUES: CampusModel = {
    name: '',
    location: '',
    description: '',
    isEnabled: true,
};

const AdminCampusesPage = () => {
    const {
        campusesAdminPaginationQuery,
        campusQuery,
        createCampusMutation,
        updateCampusMutation,
        setPage,
        setPageSize,
        setSearchTerm,
        setSelectedCampusId,
        page,
        pageSize,
        searchTerm,
        selectedCampusId,
    } = useCampuses();

    const [isCreating, setIsCreating] = useState(false);

    // Derivar valores iniciales *controlados* para Formik
    const editInitialValues: CampusModel = useMemo(() => {
        const data = campusQuery.data?.data;
        if (!selectedCampusId || !data) return EMPTY_VALUES;
        return {
            name: data.name ?? '',
            location: data.location ?? '',
            description: data.description ?? '',
            isEnabled: data.isEnabled ?? true,
        };
    }, [selectedCampusId, campusQuery.data?.data]);

    const allCampuses = campusesAdminPaginationQuery.data?.data?.items || [];
    const totalPages = campusesAdminPaginationQuery.data?.data?.totalPages || 1;

    const handleSelectCampus = (id: string) => {
        setSelectedCampusId(id);
        setIsCreating(false);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-80 flex flex-col border-r border-gray-200 bg-white shadow-sm">
                <div className="p-4 border-b border-gray-200">
                    <h1 className="text-xl font-semibold text-gray-800">Administrar Campuses</h1>

                    <div className="mt-4 flex flex-col space-y-3">
                        <input
                            type="text"
                            placeholder="Buscar campuses..."
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            onClick={() => {
                                setIsCreating(true);
                                setSelectedCampusId(null);
                            }}
                            className="px-2 event-details-button m-2"
                        >
                            Nuevo Campus
                        </button>
                    </div>
                </div>

                {/* Lista de campuses */}
                <div className="flex-1 overflow-y-auto">
                    {campusesAdminPaginationQuery.isLoading ? (
                        <div className="p-4 text-center text-gray-500">Cargando...</div>
                    ) : campusesAdminPaginationQuery.error ? (
                        <div className="p-4 text-red-500 text-sm">Error al cargar campuses</div>
                    ) : (
                        <ul>
                            {allCampuses.map((campus: any) => (
                                <li
                                    key={campus.id}
                                    className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${selectedCampusId === campus.id ? 'bg-blue-50' : 'hover:bg-gray-50'
                                        } ${!campus.isEnabled ? 'opacity-75' : ''}`}
                                    onClick={() => handleSelectCampus(campus.id)}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3
                                                className={`font-medium text-gray-800 ${!campus.isEnabled ? 'line-through' : ''}`}
                                            >
                                                {campus.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-1">{campus.location}</p>
                                        </div>
                                        {!campus.isEnabled && (
                                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                Inactivo
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Paginación */}
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
                        >
                            ← Anterior
                        </button>
                        <span className="text-sm text-gray-600">
                            Página {page} de {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => p + 1)}
                            disabled={page >= totalPages}
                            className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-100 disabled:opacity-50"
                        >
                            Siguiente →
                        </button>
                    </div>
                    <div className="mt-2 flex justify-center">
                        <select
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                            className="text-sm border border-gray-300 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value={5}>5 por página</option>
                            <option value={10}>10 por página</option>
                            <option value={20}>20 por página</option>
                            <option value={50}>50 por página</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Panel principal */}
            <div className="flex-1 p-6 overflow-y-auto">
                {isCreating ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto">
                        <h2 className="text-xl font-semibold text-gray-800 mb-6">Crear Nuevo Campus</h2>
                        <Formik
                            initialValues={EMPTY_VALUES}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                createCampusMutation.mutate(values, {
                                    onSuccess: () => {
                                        setIsCreating(false);
                                        setSelectedCampusId(null);
                                        resetForm();
                                    },
                                    onSettled: () => setSubmitting(false),
                                });
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-4 p-3 m-">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                                        <Field
                                            type="text"
                                            name="name"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación*</label>
                                        <Field
                                            type="text"
                                            name="location"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                        <ErrorMessage name="location" component="div" className="text-red-500 text-xs mt-1" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                        <Field
                                            as="textarea"
                                            name="description"
                                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                            rows={3}
                                        />
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <Field
                                            type="checkbox"
                                            name="isEnabled"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="text-sm text-gray-700">Activo</label>
                                    </div>

                                    <div className="flex justify-end space-x-3 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setIsCreating(false)}
                                            className="px-2 event-details-button m-2"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-2 event-details-button m-2"
                                        >
                                            {isSubmitting ? 'Creando...' : 'Crear Campus'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                ) : selectedCampusId ? (
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl mx-auto">
                        {campusQuery.isLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                            </div>
                        ) : campusQuery.error ? (
                            <div className="p-4 bg-red-50 text-red-600 rounded-md text-sm">Error al cargar el campus</div>
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Editar Campus</h2>
                                </div>

                                <Formik
                                    key={selectedCampusId}
                                    initialValues={editInitialValues}
                                    enableReinitialize
                                    onSubmit={(values, { setSubmitting }) => {
                                        if (!selectedCampusId) return;
                                        updateCampusMutation.mutate(
                                            {
                                                id: selectedCampusId,
                                                campusData: values,
                                            },
                                            { onSettled: () => setSubmitting(false) }
                                        );
                                    }}
                                >
                                    {({ isSubmitting, values, setFieldValue, submitForm }) => (
                                        <Form className="space-y-4 p-4">
                                            <div className="flex justify-end">
                                                {values.isEnabled ? (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            if (confirm('¿Estás seguro de desactivar este campus?')) {
                                                                setFieldValue('isEnabled', false);
                                                                submitForm();
                                                            }
                                                        }}
                                                        className="px-3 py-1 bg-red-50 text-red-600 rounded-md text-sm hover:bg-red-100"
                                                        disabled={updateCampusMutation.isPending || isSubmitting}
                                                    >
                                                        Desactivar Campus
                                                    </button>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFieldValue('isEnabled', true);
                                                            submitForm();
                                                        }}
                                                        className="px-2 event-details-button"
                                                        disabled={updateCampusMutation.isPending || isSubmitting}
                                                    >
                                                        Activar Campus
                                                    </button>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre*</label>
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                                <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación*</label>
                                                <Field
                                                    type="text"
                                                    name="location"
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                                <ErrorMessage name="location" component="div" className="text-red-500 text-xs mt-1" />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                                <Field
                                                    as="textarea"
                                                    name="description"
                                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                                    rows={3}
                                                />
                                            </div>

                                            {/* <div className="flex items-center space-x-2">
                                                <Field
                                                    type="checkbox"
                                                    name="isEnabled"
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <label className="text-sm text-gray-700">Activo</label>
                                            </div> */}

                                            <div className="flex justify-end space-x-3 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedCampusId(null)}
                                                    className="px-2 event-details-button m-2"
                                                >
                                                    Cerrar
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="px-2 event-details-button m-2"
                                                >
                                                    {isSubmitting ? 'Actualizando...' : 'Actualizar Campus'}
                                                </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center p-8 max-w-md">
                            <div className="mx-auto h-16 w-16 text-gray-400 mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Administración de Campuses</h3>
                            <p className="text-sm text-gray-500 mb-4">
                                Selecciona un campus de la lista para editarlo o crea uno nuevo.
                            </p>
                            <button
                                onClick={() => setIsCreating(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                                Crear Nuevo Campus
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminCampusesPage;
