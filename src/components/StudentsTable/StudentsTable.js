import React from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";

export class StudentsTable extends React.PureComponent {
  render() {
    let { students, actions, title } = this.props;

    return (
      <MaterialTable
        title={title}
        columns={[
          { title: "Имя", field: "name", width: 150 },
          {
            title: "Очки",
            field: "score",
            type: "numeric",
            defaultSort: "desc"
          }
        ]}
        data={students}
        actions={actions}
        options={{
          paging: false,
          search: false,
          actionsColumnIndex: -1
        }}
        localization={{
          header: {
            actions: ""
          },
          body: {
            emptyDataSourceMessage: "Пусто"
          }
        }}
      />
    );
  }
}

StudentsTable.defaultProps = {
  title: "Список студентов"
};

StudentsTable.propTypes = {
  students: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object.isRequired)
};
