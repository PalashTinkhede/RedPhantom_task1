import React from 'react';
import { FiEdit2, FiTrash2, FiFilter } from 'react-icons/fi';
import styles from './ActivityTable.module.css';

const STATUS_MAP = {
  Completed: { label: 'Completed', cls: styles.completed },
  'In Progress': { label: 'In Progress', cls: styles.inprogress },
  Pending: { label: 'Pending', cls: styles.pending },
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Skeleton rows shown during loading
const SkeletonRows = () =>
  Array.from({ length: 5 }).map((_, i) => (
    <tr key={i} className={styles.skeletonRow}>
      <td>
        <div className={styles.skelUser}>
          <div className={`skeleton ${styles.skelAvatar}`} />
          <div className={`skeleton ${styles.skelText}`} style={{ width: '110px' }} />
        </div>
      </td>
      <td><div className={`skeleton ${styles.skelText}`} style={{ width: '200px' }} /></td>
      <td><div className={`skeleton ${styles.skelBadge}`} style={{ width: '90px' }} /></td>
      <td><div className={`skeleton ${styles.skelBadge}`} style={{ width: '80px' }} /></td>
      <td><div className={`skeleton ${styles.skelText}`} style={{ width: '80px' }} /></td>
      <td><div className={`skeleton ${styles.skelText}`} style={{ width: '60px' }} /></td>
    </tr>
  ));

const ActivityTable = ({ activities = [], loading = false }) => {
  return (
    <div className={styles.wrapper}>
      {/* Header */}
      <div className={styles.tableHeader}>
        <div>
          <h2 className={styles.tableTitle}>Recent Activity</h2>
          <p className={styles.tableSubtitle}>
            {loading ? 'Loading...' : `${activities.length} records found`}
          </p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.filterBtn} aria-label="Filter table" id="filter-btn">
            <FiFilter />
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={styles.scrollContainer}>
        <table className={styles.table} aria-label="Recent activity table">
          <thead>
            <tr>
              <th scope="col">User</th>
              <th scope="col">Activity</th>
              <th scope="col">Project</th>
              <th scope="col">Status</th>
              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <SkeletonRows />
            ) : activities.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <div className={styles.emptyState}>
                    <div className={styles.emptyIcon} aria-hidden="true">📭</div>
                    <p className={styles.emptyTitle}>No recent activity</p>
                    <p className={styles.emptyText}>Activity will appear here once actions are recorded.</p>
                  </div>
                </td>
              </tr>
            ) : (
              activities.map((row) => {
                const statusInfo = STATUS_MAP[row.status] || { label: row.status, cls: '' };
                return (
                  <tr key={row.id}>
                    <td>
                      <div className={styles.userCell}>
                        <div className={styles.avatar} aria-hidden="true">{row.avatar}</div>
                        <span className={styles.userName}>{row.user}</span>
                      </div>
                    </td>
                    <td>
                      <span className={styles.activityText} title={row.activity}>
                        {row.activity}
                      </span>
                    </td>
                    <td>
                      <span className={styles.projectBadge}>{row.project}</span>
                    </td>
                    <td>
                      <span className={`${styles.status} ${statusInfo.cls}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td>
                      <span className={styles.dateText}>{formatDate(row.date)}</span>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionBtn}
                          aria-label={`Edit activity by ${row.user}`}
                          id={`edit-btn-${row.id}`}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className={`${styles.actionBtn} ${styles.delete}`}
                          aria-label={`Delete activity by ${row.user}`}
                          id={`delete-btn-${row.id}`}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityTable;
